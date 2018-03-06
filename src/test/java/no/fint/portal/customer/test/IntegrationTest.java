package no.fint.portal.customer.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = "spring.profiles.active=test", webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class IntegrationTest {

  @Autowired
  MockMvc mockMvc;

  @Test
  public void components() throws Exception {
    mockMvc.perform(get("/api/components")).andExpect(status().isOk());
    mockMvc.perform(get("/api/components/administrasjon_personal")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo("administrasjon_personal")));
  }

  @Test
  public void assets() throws Exception {
    mockMvc.perform(get("/api/assets/testing/")).andExpect(status().isOk());
    mockMvc.perform(post("/api/assets/testing/").content("{ \"assetId\": \"test.no\", \"description\": \"Test Norge AS\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(201));
    mockMvc.perform(get("/api/assets/testing/test_no")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo("test_no")));
    mockMvc.perform(put("/api/assets/testing/test_no").content("{ \"assetId\": \"test.no\", \"name\": \"test_no\", \"description\": \"Test Mer Norge AS\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.description").value(equalTo("Test Mer Norge AS")));
    mockMvc.perform(get("/api/adapters/testing")).andExpect(status().isOk());
    mockMvc.perform(post("/api/adapters/testing").content("{ \"name\": \"testAdapter\", \"note\": \"Test Adapter\", \"secret\": \"Open Sesame!\", \"shortDescription\": \"This is a Test Adapter\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    mockMvc.perform(get("/api/adapters/testing/testadapter")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo("testAdapter")));
    mockMvc.perform(get("/api/adapters/testing/testadapter/secret")).andExpect(status().isOk()).andExpect(content().string(containsString("_ClientSecret")));
    mockMvc.perform(put("/api/adapters/testing/testadapter/password").content("This is the new password").contentType(MediaType.TEXT_PLAIN)).andExpect(status().isOk());
    mockMvc.perform(put("/api/adapters/testing/testadapter").content("{ \"name\": \"testadapter\", \"note\": \"Test Adapter With New Note\", \"shortDescription\": \"This is a Brand Spanking New Test Adapter\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.shortDescription").value(containsString("Spanking")));
    mockMvc.perform(put("/api/assets/testing/test_no/adapters/testadapter")).andExpect(status().is(204));
    mockMvc.perform(put("/api/components/administrasjon_personal/testing/adapters/testadapter").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(204));
    mockMvc.perform(delete("/api/components/administrasjon_personal/testing/adapters/testadapter")).andExpect(status().is(204));
    mockMvc.perform(delete("/api/components/administrasjon_personal/testing/adapters/testadapter")).andExpect(status().is(204));
    mockMvc.perform(delete("/api/adapters/testing/testadapter")).andExpect(status().is(204));
    mockMvc.perform(get("/api/clients/testing")).andExpect(status().is(200));
    mockMvc.perform(post("/api/clients/testing").content("{ \"name\": \"testclient\", \"note\": \"Test Client\", \"secret\": \"password\", \"shortDescription\": \"This is a Test Client.\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo("testclient")));
    mockMvc.perform(get("/api/clients/testing/testclient")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value(equalTo("testclient")));
    mockMvc.perform(get("/api/clients/testing/testclient/secret")).andExpect(status().isOk()).andExpect(content().string(containsString("_ClientSecret")));
    mockMvc.perform(put("/api/clients/testing/testclient").content("{ \"name\": \"testclient\", \"note\": \"Testing Client\", \"shortDescription\": \"This is an updated Test Client.\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.shortDescription").value(containsString("updated")));
    mockMvc.perform(put("/api/clients/testing/testclient/password").content("This is the new password").contentType(MediaType.TEXT_PLAIN)).andExpect(status().isOk());
    mockMvc.perform(put("/api/assets/testing/test_no/clients/testclient")).andExpect(status().is(204));
    mockMvc.perform(put("/api/components/administrasjon_personal/testing/clients/testclient").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(204));
    mockMvc.perform(delete("/api/assets/testing/test_no/clients/testclient")).andExpect(status().is(204));
    mockMvc.perform(delete("/api/components/administrasjon_personal/testing/clients/testclient")).andExpect(status().is(204));
    mockMvc.perform(delete("/api/clients/testing/testclient")).andExpect(status().is(204));
    mockMvc.perform(delete("/api/assets/testing/test_no")).andExpect(status().is(204));
  }

  @Test
  public void contacts() throws Exception {
    mockMvc.perform(get("/api/contacts")).andExpect(status().is(200));
    mockMvc.perform(get("/api/contacts/12345678901")).andExpect(status().is(200)).andExpect(jsonPath("$.nin").value(containsString("12345678901")));
    mockMvc.perform(put("/api/contacts/12345678901").content("{ \"nin\": \"12345678901\", \"firstName\": \"Tore Martin\", \"lastName\": \"Testesen\", \"mail\": \"test123@example.com\", \"mobile\": \"98765431\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(200)).andExpect(jsonPath("$.mail").value(equalTo("test123@example.com")));
    mockMvc.perform(post("/api/contacts").content("{ \"firstName\": \"John\", \"lastName\": \"Doe\", \"mail\": \"john.doe@example.com\", \"mobile\": \"1-800-555-1212\", \"nin\": \"00000000000\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(201)).andExpect(jsonPath("$.nin").value(equalTo("00000000000")));
    mockMvc.perform(delete("/api/contacts/00000000000")).andExpect(status().is(204));
  }

  @Test
  public void organisation() throws Exception {
    mockMvc.perform(get("/api/organisations/testing/")).andExpect(status().is(200));
    mockMvc.perform(put("/api/organisations/testing/").content("{ \"displayName\": \"Testing Unlimited\" }").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is(200)).andExpect(jsonPath("$.displayName").value(containsString("Unlimited")));
    mockMvc.perform(put("/api/organisations/testing/components/administrasjon_personal")).andExpect(status().is(204));
    mockMvc.perform(delete("/api/organisations/testing/components/administrasjon_personal")).andExpect(status().is(204));
    mockMvc.perform(put("/api/organisations/testing/contacts/legal/12345678901")).andExpect(status().is(204));
    mockMvc.perform(get("/api/organisations/testing/contacts/legal")).andExpect(status().is(200)).andExpect(jsonPath("$.nin").value(equalTo("12345678901")));
    mockMvc.perform(delete("/api/organisations/testing/contacts/legal/12345678901")).andExpect(status().is(204));
    mockMvc.perform(get("/api/organisations/testing/contacts/technical")).andExpect(status().is(200));
    mockMvc.perform(put("/api/organisations/testing/contacts/technical/23456789012")).andExpect(status().is(204));
    mockMvc.perform(delete("/api/organisations/testing/contacts/technical/23456789012")).andExpect(status().is(204));
  }
}