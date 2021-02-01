package no.fint.portal.customer.test;

import no.fint.portal.customer.service.IdentityMaskingService;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.organisation.Organisation;
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


import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
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

    String org = "testing";
    String component = "administrasjon_personal";
    String asset = "test_test_no";
    String adapter = "testadapter@adapter.test.no";
    String client = "testclient@client.test.no";
    String contact1 = "12345678901";
    String contact2 = "23456789012";

    @Test
    public void components() throws Exception {
        mockMvc.perform(get("/api/components").header("x-nin", "12345678901")).andExpect(status().isOk());
        mockMvc.perform(get("/api/components/{component}", component).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo(component)));
    }

    @Test
    public void assets() throws Exception {
        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());

        mockMvc.perform(get("/api/assets/{org}/", org).header("x-nin", "12345678901")).andExpect(status().isOk());
        mockMvc.perform(post("/api/assets/{org}/", org).header("x-nin", "12345678901").content("{ \"assetId\": \"test\", \"description\": \"Test Norge AS\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(201));
        mockMvc.perform(get("/api/assets/{org}/{asset}", org, asset).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo(asset)));
        mockMvc.perform(put("/api/assets/{org}/{asset}", org, asset).header("x-nin", "12345678901").content("{ \"assetId\": \"test.no\", \"name\": \"" + asset + "\", \"description\": \"Test Mer Norge AS\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.description").value(equalTo("Test Mer Norge AS")));
        mockMvc.perform(get("/api/adapters/{org}", org).header("x-nin", "12345678901")).andExpect(status().isOk());
        mockMvc.perform(post("/api/adapters/{org}", org).header("x-nin", "12345678901").content("{ \"name\": \"testadapter\", \"note\": \"Test Adapter\", \"secret\": \"Open Sesame!\", \"shortDescription\": \"This is a Test Adapter\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(201));
        mockMvc.perform(get("/api/adapters/{org}/{adapter}", org, adapter).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo(adapter)));
        mockMvc.perform(get("/api/adapters/{org}/{adapter}/secret", org, adapter).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(content().string(containsString("_ClientSecret")));
        mockMvc.perform(put("/api/adapters/{org}/{adapter}/password", org, adapter).header("x-nin", "12345678901").content("This is the new password").contentType(MediaType.TEXT_PLAIN)).andExpect(status().isOk());
        mockMvc.perform(put("/api/adapters/{org}/{adapter}", org, adapter).header("x-nin", "12345678901").content("{ \"name\": \"" + adapter + "\", \"note\": \"Test Adapter With New Note\", \"shortDescription\": \"This is a Brand Spanking New Test Adapter\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.shortDescription").value(containsString("Spanking")));
        mockMvc.perform(put("/api/assets/{org}/{asset}/adapters/{adapter}", org, asset, adapter).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(put("/api/components/{component}/{org}/adapters/{adapter}", component, org, adapter).header("x-nin", "12345678901").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(204));
        mockMvc.perform(delete("/api/components/{component}/{org}/adapters/{adapter}", component, org, adapter).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/api/components/{component}/{org}/adapters/{adapter}", component, org, adapter).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/api/adapters/{org}/{adapter}", org, adapter).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(get("/api/clients/{org}", org).header("x-nin", "12345678901")).andExpect(status().is(200));
        mockMvc.perform(post("/api/clients/{org}", org).header("x-nin", "12345678901").content("{ \"name\": \"testclient\", \"note\": \"Test Client\", \"secret\": \"password\", \"shortDescription\": \"This is a Test Client.\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(201)).andExpect(jsonPath("$.name").value(equalTo(client)));
        mockMvc.perform(get("/api/clients/{org}/{client}", org, client).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo(client)));
        mockMvc.perform(get("/api/clients/{org}/{client}/secret", org, client).header("x-nin", "12345678901")).andExpect(status().isOk()).andExpect(content().string(containsString("_ClientSecret")));
        mockMvc.perform(put("/api/clients/{org}/{client}", org, client).header("x-nin", "12345678901").content("{ \"name\": \"" + client + "\", \"note\": \"Testing Client\", \"shortDescription\": \"This is an updated Test Client.\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.shortDescription").value(containsString("updated")));
        mockMvc.perform(put("/api/clients/{org}/{client}/password", org, client).header("x-nin", "12345678901").content("This is the new password").contentType(MediaType.TEXT_PLAIN)).andExpect(status().isOk());
        mockMvc.perform(put("/api/assets/{org}/{asset}/clients/{client}", org, asset, client).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(put("/api/components/{component}/{org}/clients/{client}", component, org, client).header("x-nin", "12345678901").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(204));
        mockMvc.perform(delete("/api/assets/{org}/{asset}/clients/{client}", org, asset, client).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/api/components/{component}/{org}/clients/{client}", component, org, client).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/api/clients/{org}/{client}", org, client).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/api/assets/{org}/{asset}", org, asset).header("x-nin", "12345678901")).andExpect(status().is(204));
    }

    @Test
    public void contacts() throws Exception {
        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());
        when(identityMaskingService.unmask(anyString())).thenAnswer(returnsFirstArg());

        mockMvc.perform(get("/api/contacts").header("x-nin", "12345678901")).andExpect(status().is(200));
        // TODO Removed for privacy: mockMvc.perform(get("/api/contacts/{contact}", contact1).header("x-nin", "12345678901")).andExpect(status().is(200)).andExpect(jsonPath("$.nin").value(containsString(contact1)));
        mockMvc.perform(put("/api/contacts/{contact}", contact1).header("x-nin", "12345678901").content("{ \"nin\": \"12345678901\", \"firstName\": \"Tore Martin\", \"lastName\": \"Testesen\", \"mail\": \"test123@example.com\", \"mobile\": \"98765431\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(200)).andExpect(jsonPath("$.mail").value(equalTo("test123@example.com")));
        mockMvc.perform(post("/api/contacts").header("x-nin", "12345678901").content("{ \"firstName\": \"John\", \"lastName\": \"Doe\", \"mail\": \"john.doe@example.com\", \"mobile\": \"1-800-555-1212\", \"nin\": \"00000000000\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(201)).andExpect(jsonPath("$.nin").value(equalTo("00000000000")));
        // TODO Removed for security: mockMvc.perform(delete("/api/contacts/00000000000").header("x-nin", "12345678901")).andExpect(status().is(204));
    }

    @Test
    public void organisation() throws Exception {
        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());
        when(identityMaskingService.mask(any(Contact.class))).thenAnswer(returnsFirstArg());
        when(identityMaskingService.mask(any(Organisation.class))).thenAnswer(returnsFirstArg());
        when(identityMaskingService.unmask(anyString())).thenAnswer(returnsFirstArg());

        mockMvc.perform(get("/api/organisations/{org}/", org).header("x-nin", "12345678901")).andExpect(status().is(200));
        mockMvc.perform(put("/api/organisations/{org}/", org).header("x-nin", "12345678901").content("{ \"displayName\": \"Testing Unlimited\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(200)).andExpect(jsonPath("$.displayName").value(containsString("Unlimited")));
        mockMvc.perform(put("/api/organisations/{org}/components/{component}", org, component).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/api/organisations/{org}/components/{component}", org, component).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(put("/api/organisations/{org}/contacts/legal/{contact}", org, contact1).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(get("/api/organisations/{org}/contacts/legal", org).header("x-nin", "12345678901")).andExpect(status().is(200)).andExpect(jsonPath("$.nin").value(equalTo(contact1)));
        mockMvc.perform(get("/api/contacts/organisations").header("x-nin", contact1)).andExpect(jsonPath("$[0].orgNumber").value(equalTo("123456789")));
        mockMvc.perform(delete("/api/organisations/{org}/contacts/legal/{contact}", org, contact1).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(get("/api/organisations/{org}/contacts/technical", org).header("x-nin", "12345678901")).andExpect(status().is(200));
        mockMvc.perform(put("/api/organisations/{org}/contacts/technical/{contact}", org, contact2).header("x-nin", "12345678901")).andExpect(status().is(204));
        mockMvc.perform(delete("/api/organisations/{org}/contacts/technical/{contact}", org, contact2).header("x-nin", "12345678901")).andExpect(status().is(204));
    }

    @Test
    public void security() throws Exception {
        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());
        when(identityMaskingService.unmask(anyString())).thenAnswer(returnsFirstArg());

        //mockMvc.perform(get("/api/organisations/{org}/", org)).andExpect(status().is(403));
        mockMvc.perform(put("/api/organisations/{org}/contacts/legal/{contact}", org, contact1).header("x-nin", "23456789012")).andExpect(status().is(403));
        mockMvc.perform(post("/api/adapters/{org}", org).header("x-nin", "23456789012").content("{ \"name\": \"testadapter\", \"note\": \"Test Adapter\", \"secret\": \"Open Sesame!\", \"shortDescription\": \"This is a Test Adapter\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(403));
    }

    @Test
    public void access() throws Exception {
        when(identityMaskingService.mask(anyString())).thenAnswer(returnsFirstArg());

        mockMvc.perform(get("/api/accesses/{org}/", org).header("x-nin", "12345678901")).andExpect(status().is(200)).andExpect(jsonPath("$", is(Collections.emptyList())));
        mockMvc.perform(post("/api/accesses/{org}/", org).header("x-nin", "12345678901").content("{" +
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
        mockMvc.perform(get("/api/accesses/{org}/{name}", org, "personal").header("x-nin", "12345678901")).andExpect(status().is2xxSuccessful()).andExpect(jsonPath("$.name", is("personal")));
        mockMvc.perform(put("/api/accesses/{org}/{name}", org, "personal").header("x-nin", "12345678901").content("{" +
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
        mockMvc.perform(delete("/api/accesses/{org}/{name}", org, "personal").header("x-nin", "12345678901")).andExpect(status().is2xxSuccessful());
    }
}
