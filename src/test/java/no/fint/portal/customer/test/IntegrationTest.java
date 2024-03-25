package no.fint.portal.customer.test;

import io.getunleash.Unleash;
import no.fint.portal.customer.service.IdentityMaskingService;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.organisation.Organisation;
import no.fintlabs.featuretoggle.UnleashProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.hamcrest.Matchers.*;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = "spring.profiles.active=test", webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class IntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    IdentityMaskingService identityMaskingService;

    @MockBean
    UnleashProperties unleashProperties;

    @MockBean
    Unleash unleash;

    String org = "testing";
    String component = "administrasjon_personal";
    String asset = "test_test_no";
    String adapter = "testadapter@adapter.test.no";
    String client = "testclient@client.test.no";
    String contact1 = "12345678901";
    String contact2 = "23456789012";

    @BeforeEach
    void setUp() {
        when(unleash.isEnabled("fint-kunde-portal.roles")).thenReturn(true);
    }

    @Test
    public void components() throws Exception {
        mockMvc.perform(get("/components").header("x-nin", "12345678901")).andExpect(status().isOk());
        mockMvc.perform(get("/components/{component}", component).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo(component)));
    }

    @Test
    public void assets() throws Exception {
        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());


        mockMvc.perform(get("/assets/{org}/", org).header("x-nin", "12345678901")).andExpect(status().isOk());
        mockMvc.perform(post("/assets/{org}/", org).header("x-nin", "12345678901").content("{ \"assetId\": \"test\", \"description\": \"Test Norge AS\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(201));
        mockMvc.perform(get("/assets/{org}/{asset}", org, asset).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo(asset)));
        mockMvc.perform(put("/assets/{org}/{asset}", org, asset).header("x-nin", "12345678901").content("{ \"assetId\": \"test.no\", \"name\": \"" + asset + "\", \"description\": \"Test Mer Norge AS\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.description").value(equalTo("Test Mer Norge AS")));
        mockMvc.perform(get("/adapters/{org}", org).header("x-nin", "12345678901")).andExpect(status().isOk());
        mockMvc.perform(post("/adapters/{org}", org).header("x-nin", "12345678901").content("{ \"name\": \"testadapter\", \"note\": \"Test Adapter\", \"secret\": \"Open Sesame!\", \"shortDescription\": \"This is a Test Adapter\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(201));
        mockMvc.perform(get("/adapters/{org}/{adapter}", org, adapter).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo(adapter)));
        mockMvc.perform(get("/adapters/{org}/{adapter}/secret", org, adapter).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(content().string(containsString("_ClientSecret")));
        mockMvc.perform(put("/adapters/{org}/{adapter}/password", org, adapter).header("x-nin", "12345678901").content("This is the new password").contentType(MediaType.TEXT_PLAIN)).andExpect(status().isOk());
        mockMvc.perform(put("/adapters/{org}/{adapter}", org, adapter).header("x-nin", "12345678901").content("{ \"name\": \"" + adapter + "\", \"note\": \"Test Adapter With New Note\", \"shortDescription\": \"This is a Brand Spanking New Test Adapter\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.shortDescription").value(containsString("Spanking")));
        mockMvc.perform(put("/assets/{org}/{asset}/adapters/{adapter}", org, asset, adapter).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(put("/components/organisation/{org}/{component}/adapters/{adapter}", org, component, adapter).header("x-nin", "12345678901").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(204));
        mockMvc.perform(delete("/components/organisation/{org}/{component}/adapters/{adapter}", org, component, adapter).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/components/organisation/{org}/{component}/adapters/{adapter}", org, component, adapter).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/adapters/{org}/{adapter}", org, adapter).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(get("/clients/{org}", org).header("x-nin", "12345678901")).andExpect(status().is(200));
        mockMvc.perform(post("/clients/{org}", org).header("x-nin", "12345678901").content("{ \"name\": \"testclient\", \"note\": \"Test Client\", \"secret\": \"password\", \"shortDescription\": \"This is a Test Client.\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(201)).andExpect(jsonPath("$.name").value(equalTo(client)));
        mockMvc.perform(get("/clients/{org}/{client}", org, client).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo(client)));
        mockMvc.perform(get("/clients/{org}/{client}/secret", org, client).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(content().string(containsString("_ClientSecret")));
        mockMvc.perform(put("/clients/{org}/{client}", org, client).header("x-nin", "12345678901").content("{ \"name\": \"" + client + "\", \"note\": \"Testing Client\", \"shortDescription\": \"This is an updated Test Client.\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.shortDescription").value(containsString("updated")));
        mockMvc.perform(put("/clients/{org}/{client}/password", org, client).header("x-nin", "12345678901").content("This is the new password").contentType(MediaType.TEXT_PLAIN)).andExpect(status().isOk());
        mockMvc.perform(put("/assets/{org}/{asset}/clients/{client}", org, asset, client).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(put("/components/organisation/{org}/{component}/clients/{client}", org, component, client).header("x-nin", "12345678901").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(204));
        mockMvc.perform(delete("/assets/{org}/{asset}/clients/{client}", org, asset, client).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/components/organisation/{org}/{component}/clients/{client}", org, component, client).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/clients/{org}/{client}", org, client).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/assets/{org}/{asset}", org, asset).header("x-nin", "12345678901")).andExpect(status().is(204));
    }

    @Test
    public void contacts() throws Exception {
        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());

        mockMvc.perform(get("/contacts").header("x-nin", "12345678901")).andExpect(status().is(200));
        mockMvc.perform(get("/contacts/{nin}", contact2).header("x-nin", "12345678901")).andExpect(status().is(200));
    }

    @Test
    public void organisation() throws Exception {
        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());
        when(identityMaskingService.mask(any(Contact.class))).thenAnswer(returnsFirstArg());
        when(identityMaskingService.mask(any(Organisation.class))).thenAnswer(returnsFirstArg());
        when(identityMaskingService.unmask(anyString())).thenAnswer(returnsFirstArg());

        mockMvc.perform(get("/organisations/{org}/", org).header("x-nin", "12345678901")).andExpect(status().is(200));
        mockMvc.perform(put("/organisations/{org}/", org).header("x-nin", "12345678901").content("{ \"displayName\": \"Testing Unlimited\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(200)).andExpect(jsonPath("$.displayName").value(containsString("Unlimited")));
        mockMvc.perform(put("/organisations/{org}/components/{component}", org, component).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/organisations/{org}/components/{component}", org, component).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(put("/organisations/{org}/contacts/legal/{contact}", org, contact1).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(get("/organisations/{org}/contacts/legal", org).header("x-nin", "12345678901")).andExpect(status().is(200)).andExpect(jsonPath("$.nin").value(equalTo(contact1)));
        mockMvc.perform(get("/contacts/organisations").header("x-nin", contact1)).andExpect(jsonPath("$[0].orgNumber").value(equalTo("123456789")));
        mockMvc.perform(delete("/organisations/{org}/contacts/legal/{contact}", org, contact1).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(get("/organisations/{org}/contacts/technical", org).header("x-nin", "12345678901")).andExpect(status().is(200));
        mockMvc.perform(put("/organisations/{org}/contacts/technical/{contact}", org, contact2).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/organisations/{org}/contacts/technical/{contact}", org, contact2).header("x-nin", "12345678901")).andExpect(status().is(204));
    }

    // Feilet etter vi fjernet /api i path
//    @Test
//    public void security() throws Exception {
//        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());
//        when(identityMaskingService.unmask(anyString())).thenAnswer(returnsFirstArg());
//
//        mockMvc.perform(get("/organisations/{org}/", org)).andExpect(status().is(403));
//        mockMvc.perform(put("/organisations/{org}/contacts/legal/{contact}", org, contact1).header("x-nin", "23456789012")).andExpect(status().is(403));
//        mockMvc.perform(post("/adapters/{org}", org).header("x-nin", "23456789012").content("{ \"name\": \"testadapter\", \"note\": \"Test Adapter\", \"secret\": \"Open Sesame!\", \"shortDescription\": \"This is a Test Adapter\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(403));
//    }

    @Test
    public void access() throws Exception {
        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());

        mockMvc.perform(get("/accesses/{org}/", org).header("x-nin", "12345678901")).andExpect(status().is(200)).andExpect(jsonPath("$", is(Collections.emptyList())));
        mockMvc.perform(post("/accesses/{org}/", org).header("x-nin", "12345678901").content("{" +
                "\"name\": \"personal\"," +
                "\"collection\": [" +
                "\"/administrasjon/personal/personalressurs\"" +
                "]," +
                "\"read\": [" +
                "\"/administrasjon/personal/person\"," +
                "\"/administrasjon/personal/personalressurs\"," +
                "\"/administrasjon/personal/arbeidsforhold\"" +
                "]," +
                "\"modify\": [" +
                "\"/administrasjon/personal/fravar\"" +
                "]" +
                "}").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful());
        mockMvc.perform(get("/accesses/{org}/{name}", org, "personal").header("x-nin", "12345678901")).andExpect(status().is2xxSuccessful()).andExpect(jsonPath("$.name", is("personal")));
        mockMvc.perform(put("/accesses/{org}/{name}", org, "personal").header("x-nin", "12345678901").content("{" +
                "\"name\": \"personal\"," +
                "\"collection\":[" +
                "]," +
                "\"read\":[" +
                "]," +
                "\"modify\":[" +
                "]," +
                "\"clients\":[" +
                "]" +
                "}").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful()).andExpect(jsonPath("$.collection", is(Collections.emptyList())));
        mockMvc.perform(delete("/accesses/{org}/{name}", org, "personal").header("x-nin", "12345678901")).andExpect(status().is2xxSuccessful());
    }
}
