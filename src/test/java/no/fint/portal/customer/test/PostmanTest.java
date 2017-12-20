package no.fint.portal.customer.test;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.net.Inet4Address;
import java.nio.file.Paths;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = "spring.profiles.active=test", webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class PostmanTest {
  @Ignore
  @Test
  public void integrationTest() throws Exception {
    Process process = new ProcessBuilder("docker", "run", "--net=\"host\"", "-i",
      "--add-host", "targethost:" + Inet4Address.getLocalHost().getHostAddress(),
      "-v", Paths.get(".").toAbsolutePath().toString()+":/etc/newman",
      "postman/newman_ubuntu1404", "run", "fint-kunde-portal.postman_collection.json", "--reporters=\"junit,cli\"",
      "--reporter-junit-export=\"newman-report.xml\"").inheritIO().start();
    int result = process.waitFor();
    assertThat(result, is(0));
  }
}
