package no.fint.portal.customer.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "feature")
data class FeatureProperties(
    val flags: Map<String, Boolean>
) {
    fun isEnabled(feature: Feature): Boolean = flags[feature.key] ?: true
}

enum class Feature(val key: String) {
    OAUTH_CREDENTIALS_CREATE("oauth-credentials-create"),
    OAUTH_CREDENTIALS_DELETE("oauth-credentials-delete")
}
