package no.fint.portal.customer.model

import no.fint.portal.model.client.Client
import no.fint.portal.model.client.ModelVersion

class ClientModelVersionStats(
    private val countsByOrg: Map<OrgName, Map<ModelVersion, Long>>
) {

    fun getV4Percentage(): Map<OrgName, Double> =
        countsByOrg.mapValues { (_, counts) -> calculateV4Percentage(counts) }

    fun getV4Percentage(orgName: OrgName): Double {
        val counts = countsByOrg[orgName] ?: return 0.0
        return calculateV4Percentage(counts)
    }

    fun countsByOrg(): Map<OrgName, Map<ModelVersion, Long>> = countsByOrg

    private fun calculateV4Percentage(counts: Map<ModelVersion, Long>): Double {
        val total = counts.values.sum()
        if (total == 0L) return 0.0

        val v4Count = counts[ModelVersion.V4] ?: 0L
        return v4Count.toDouble() / total * 100.0
    }

    companion object {
        fun empty() = ClientModelVersionStats(emptyMap())

        fun from(clientsByOrg: Map<OrgName, List<Client>>): ClientModelVersionStats {
            val countsByOrg = clientsByOrg.mapValues { (_, clients) ->
                clients.groupingBy { it.modelVersion ?: ModelVersion.V3 }
                    .eachCount()
                    .mapValues { it.value.toLong() }
            }
            return ClientModelVersionStats(countsByOrg)
        }
    }
}
