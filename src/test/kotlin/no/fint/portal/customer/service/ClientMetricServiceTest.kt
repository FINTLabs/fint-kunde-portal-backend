package no.fint.portal.customer.service

import io.micrometer.core.instrument.simple.SimpleMeterRegistry
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import no.fint.portal.customer.model.OrgName
import no.fint.portal.model.client.Client
import no.fint.portal.model.client.ClientService
import no.fint.portal.model.client.ModelVersion
import no.fint.portal.model.organisation.Organisation
import no.fint.portal.model.organisation.OrganisationService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class ClientMetricServiceTest {

    private val organisationService = mockk<OrganisationService>()
    private val clientService = mockk<ClientService>()
    private lateinit var meterRegistry: SimpleMeterRegistry
    private lateinit var service: ClientMetricService

    @BeforeEach
    fun setUp() {
        meterRegistry = SimpleMeterRegistry()
        service = ClientMetricService(organisationService, clientService, meterRegistry)
    }

    @Test
    fun `refreshCache populates stats`() {
        setupOrgs("org1" to listOf(createClient(ModelVersion.V3), createClient(ModelVersion.V4)))

        service.refreshCache()

        val counts = service.getStats().countsByOrg()[OrgName("org1")]!!
        assertEquals(1L, counts[ModelVersion.V3])
        assertEquals(1L, counts[ModelVersion.V4])
    }

    @Test
    fun `refreshCache preserves old stats on LDAP failure`() {
        setupOrgs("org1" to listOf(createClient(ModelVersion.V4)))
        service.refreshCache()

        every { organisationService.organisations } throws RuntimeException("LDAP down")
        service.refreshCache()

        assertEquals(1L, service.getStats().countsByOrg()[OrgName("org1")]!![ModelVersion.V4])
    }

    @Test
    fun `refreshCache registers gauges with correct values`() {
        setupOrgs("org1" to listOf(
            createClient(ModelVersion.V3),
            createClient(ModelVersion.V4),
            createClient(ModelVersion.V4)
        ))

        service.refreshCache()

        assertEquals(1.0, findGauge("org1", "V3"))
        assertEquals(2.0, findGauge("org1", "V4"))
    }

    @Test
    fun `refreshCache registers gauges for multiple organisations`() {
        setupOrgs(
            "org1" to listOf(createClient(ModelVersion.V3)),
            "org2" to listOf(createClient(ModelVersion.V4))
        )

        service.refreshCache()

        assertNotNull(findGauge("org1", "V3"))
        assertNotNull(findGauge("org2", "V4"))
    }

    @Test
    fun `refreshCache updates gauge values on subsequent refresh`() {
        setupOrgs("org1" to listOf(createClient(ModelVersion.V3)))
        service.refreshCache()
        assertEquals(1.0, findGauge("org1", "V3"))

        setupOrgs("org1" to listOf(createClient(ModelVersion.V3), createClient(ModelVersion.V4), createClient(ModelVersion.V4)))
        service.refreshCache()

        assertEquals(1.0, findGauge("org1", "V3"))
        assertEquals(2.0, findGauge("org1", "V4"))
    }

    @Test
    fun `refreshCache excludes managed clients`() {
        setupOrgs("org1" to listOf(
            createClient(ModelVersion.V4, managed = false),
            createClient(ModelVersion.V4, managed = true),
            createClient(ModelVersion.V4, managed = true)
        ))

        service.refreshCache()

        assertEquals(1L, service.getStats().countsByOrg()[OrgName("org1")]!![ModelVersion.V4])
    }

    @Test
    fun `getStats returns empty stats before first refresh`() {
        assertTrue(service.getStats().countsByOrg().isEmpty())
    }

    @Test
    fun `reading gauge does not trigger LDAP fetch`() {
        setupOrgs("org1" to listOf(createClient(ModelVersion.V4)))
        service.refreshCache()

        repeat(10) { findGauge("org1", "V4") }

        verify(exactly = 1) { organisationService.organisations }
        verify(exactly = 1) { clientService.getClients("org1") }
    }

    private fun setupOrgs(vararg orgs: Pair<String, List<Client>>) {
        every { organisationService.organisations } returns orgs.map { (name, _) ->
            Organisation().apply { this.name = name }
        }
        orgs.forEach { (name, clients) ->
            every { clientService.getClients(name) } returns clients
        }
    }

    private fun createClient(version: ModelVersion?, managed: Boolean = false) = Client().apply {
        this.modelVersion = version
        this.isManaged = managed
    }

    private fun findGauge(org: String, version: String) =
        meterRegistry.find("fint.clients.model.version")
            .tag("organisation", org)
            .tag("modelVersion", version)
            .gauge()?.value()
}
