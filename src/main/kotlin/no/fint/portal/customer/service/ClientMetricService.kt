package no.fint.portal.customer.service

import io.micrometer.core.instrument.MeterRegistry
import io.micrometer.core.instrument.MultiGauge
import io.micrometer.core.instrument.Tags
import no.fint.portal.customer.model.ClientModelVersionStats
import no.fint.portal.customer.model.OrgName
import no.fint.portal.model.client.ClientService
import no.fint.portal.model.organisation.OrganisationService
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.util.concurrent.atomic.AtomicReference
import javax.annotation.PostConstruct

@Service
class ClientMetricService(
    private val organisationService: OrganisationService,
    private val clientService: ClientService,
    meterRegistry: MeterRegistry
) {
    private val log = LoggerFactory.getLogger(ClientMetricService::class.java)

    private val clientModelVersionGauge = MultiGauge.builder("fint.clients.model.version")
        .description("Number of clients per organisation and model version")
        .register(meterRegistry)

    private val stats = AtomicReference(ClientModelVersionStats.empty())

    @PostConstruct
    @Scheduled(fixedRateString = "\${fint.metrics.client.refresh-rate:300000}")
    fun refreshCache() {
        try {
            val clientsByOrg = organisationService.organisations.associate { org ->
                OrgName(org.name) to clientService.getClients(org.name).filterNot { it.isManaged }
            }

            val newStats = ClientModelVersionStats.from(clientsByOrg)
            stats.set(newStats)
            updateGauges(newStats)

            log.info("Refreshed client metric cache for {} organisations", clientsByOrg.size)
        } catch (e: Exception) {
            log.error("Failed to refresh client metric cache", e)
        }
    }

    private fun updateGauges(stats: ClientModelVersionStats) {
        val rows = stats.countsByOrg().flatMap { (orgName, versions) ->
            versions.map { (version, count) ->
                MultiGauge.Row.of(
                    Tags.of("organisation", orgName.value, "modelVersion", version.name),
                    count
                )
            }
        }
        clientModelVersionGauge.register(rows, true)
    }

    fun getStats(): ClientModelVersionStats = stats.get()
}
