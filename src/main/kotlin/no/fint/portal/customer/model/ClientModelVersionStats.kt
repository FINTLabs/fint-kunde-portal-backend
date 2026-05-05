package no.fint.portal.customer.model

import no.fint.portal.model.client.Client
import no.fint.portal.model.client.ModelVersion

class ClientModelVersionStats(
    private val countsByOrg: Map<OrgName, Map<ModelVersion, Long>>
) {

    fun countsByOrg(): Map<OrgName, Map<ModelVersion, Long>> = countsByOrg

    fun countsFor(orgName: OrgName): Map<ModelVersion, Long> = countsByOrg[orgName] ?: emptyMap()

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
