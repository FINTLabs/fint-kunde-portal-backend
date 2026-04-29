package no.fint.portal.customer.model

import no.fint.portal.model.client.Client
import no.fint.portal.model.client.ModelVersion
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class ClientModelVersionStatsTest {

    private val org1 = OrgName("org1")
    private val org2 = OrgName("org2")
    private val emptyOrg = OrgName("empty-org")

    @Test
    fun `from counts model versions correctly`() {
        val stats = ClientModelVersionStats.from(
            mapOf(org1 to listOf(
                createClient(ModelVersion.V3),
                createClient(ModelVersion.V4),
                createClient(ModelVersion.V4)
            ))
        )

        val counts = stats.countsByOrg()[org1]!!
        assertEquals(1L, counts[ModelVersion.V3])
        assertEquals(2L, counts[ModelVersion.V4])
    }

    @Test
    fun `from defaults null modelVersion to V3`() {
        val stats = ClientModelVersionStats.from(
            mapOf(org1 to listOf(
                createClient(null),
                createClient(null),
                createClient(ModelVersion.V4)
            ))
        )

        val counts = stats.countsByOrg()[org1]!!
        assertEquals(2L, counts[ModelVersion.V3])
        assertEquals(1L, counts[ModelVersion.V4])
    }

    @Test
    fun `from handles multiple organisations`() {
        val stats = ClientModelVersionStats.from(
            mapOf(
                org1 to listOf(createClient(ModelVersion.V3)),
                org2 to listOf(createClient(ModelVersion.V4), createClient(ModelVersion.V4))
            )
        )

        assertEquals(1L, stats.countsByOrg()[org1]!![ModelVersion.V3])
        assertEquals(2L, stats.countsByOrg()[org2]!![ModelVersion.V4])
    }

    @Test
    fun `from handles empty client list`() {
        val stats = ClientModelVersionStats.from(mapOf(emptyOrg to emptyList()))

        assertTrue(stats.countsByOrg()[emptyOrg]!!.isEmpty())
    }

    @Test
    fun `empty returns no data`() {
        val stats = ClientModelVersionStats.empty()

        assertTrue(stats.countsByOrg().isEmpty())
    }

    @Test
    fun `countsFor returns counts for the given org`() {
        val stats = ClientModelVersionStats.from(
            mapOf(org1 to listOf(createClient(ModelVersion.V3), createClient(ModelVersion.V4)))
        )

        val counts = stats.countsFor(org1)
        assertEquals(1L, counts[ModelVersion.V3])
        assertEquals(1L, counts[ModelVersion.V4])
    }

    @Test
    fun `countsFor returns empty map for unknown org`() {
        val stats = ClientModelVersionStats.empty()

        assertTrue(stats.countsFor(OrgName("nonexistent")).isEmpty())
    }

    private fun createClient(version: ModelVersion?) = Client().apply {
        this.modelVersion = version
    }
}
