package no.fint.portal.customer.model

import no.fint.portal.customer.exception.NameTooLongException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.junit.jupiter.api.assertThrows

class CommonNameTest {

    private val primaryAssetId = "fintlabs.no"

    @Test
    fun `build matches the CN format used by fint-portal-api`() {
        assertEquals("test@client.fintlabs.no", CommonName.CLIENT.build("test", primaryAssetId))
        assertEquals("test@adapter.fintlabs.no", CommonName.ADAPTER.build("test", primaryAssetId))
    }

    @Test
    fun `maxNameLength subtracts the CN suffix from 64`() {
        assertEquals(45, CommonName.CLIENT.maxNameLength(primaryAssetId))
        assertEquals(44, CommonName.ADAPTER.maxNameLength(primaryAssetId))
    }

    @Test
    fun `validate accepts a name that gives a CN of exactly 64 characters`() {
        assertDoesNotThrow { CommonName.CLIENT.validate("a".repeat(45), primaryAssetId) }
        assertDoesNotThrow { CommonName.ADAPTER.validate("a".repeat(44), primaryAssetId) }
    }

    @Test
    fun `validate rejects a name that gives a CN longer than 64 characters`() {
        val exception = assertThrows<NameTooLongException> {
            CommonName.CLIENT.validate("a".repeat(46), primaryAssetId)
        }
        assertEquals("Name can be at most 45 characters for this organisation.", exception.message)

        assertThrows<NameTooLongException> { CommonName.ADAPTER.validate("a".repeat(45), primaryAssetId) }
    }
}
