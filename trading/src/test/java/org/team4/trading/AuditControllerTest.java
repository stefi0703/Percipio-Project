package org.team4.trading;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.team4.trading.audit.AuditController;
import org.team4.trading.audit.AuditLog;
import org.team4.trading.audit.AuditService;
import org.team4.trading.config.SecurityConfig;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.security.test.context.support.WithMockUser;

@WebMvcTest(AuditController.class)
@Import(SecurityConfig.class)
@WithMockUser(username = "user", roles = {"ADMIN"})

class AuditControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuditService auditService;

    @Test
    void getLogs_returnsList() throws Exception {
        when(auditService.getLogs()).thenReturn(List.of(new AuditLog()));

        mockMvc.perform(get("/api/audit/logs")
                        .with(httpBasic("test", "test")))
                .andExpect(status().isOk());
    }

    @Test
    void getErrorLogs_filtersErrors() throws Exception {
        AuditLog errorLog = new AuditLog();
        errorLog.setLevel("ERROR");
        when(auditService.getLogs()).thenReturn(List.of(errorLog));

        mockMvc.perform(get("/api/audit/errors/logs")
                        .with(httpBasic("test", "test")))
                .andExpect(status().isOk());
    }
}
