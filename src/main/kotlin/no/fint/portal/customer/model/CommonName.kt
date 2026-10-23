package no.fint.portal.customer.model

import no.fint.portal.customer.exception.NameTooLongException

/**
 * Builds the LDAP CN the same way fint-portal-api does when creating clients and adapters,
 * so the length can be checked before anything is created in NAM or LDAP.
 */
enum class CommonName(private val type: String) {
    CLIENT("client"),
    ADAPTER("adapter");

    fun build(name: String?, primaryAssetId: String?): String = "$name@$type.$primaryAssetId"

    fun maxNameLength(primaryAssetId: String?): Int = MAX_LENGTH - build("", primaryAssetId).length

    fun validate(name: String?, primaryAssetId: String?) {
        if (build(name, primaryAssetId).length > MAX_LENGTH) {
            throw NameTooLongException(
                "Name can be at most ${maxNameLength(primaryAssetId)} characters for this organisation."
            )
        }
    }

    companion object {
        const val MAX_LENGTH = 64
    }
}
