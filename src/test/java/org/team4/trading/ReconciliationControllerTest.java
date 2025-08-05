package org.team4.trading;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.team4.trading.config.SecurityConfig;
import org.team4.trading.reconciliation.ReconciliationController;
import org.team4.trading.reconciliation.ReconciliationDifference;
import org.team4.trading.reconciliation.ReconciliationRun;
import org.team4.trading.reconciliation.ReconciliationService;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.security.test.context.support.WithMockUser;

@WebMvcTest(ReconciliationController.class)
@Import(SecurityConfig.class)
@WithMockUser(username = "user", roles = {"ADMIN"})

class ReconciliationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReconciliationService reconciliationService;

    @Test
    void startReconciliation_returnsRun() throws Exception {
        when(reconciliationService.reconcile()).thenReturn(new ReconciliationRun());

        mockMvc.perform(post("/api/reconciliation/start")
                        .with(httpBasic("admin", "admin")))
                .andExpect(status().isOk());
    }

    @Test
    void getAllReconciliationRuns_returnsList() throws Exception {
        when(reconciliationService.getAllReconciliationRuns()).thenReturn(List.of(new ReconciliationRun()));

        mockMvc.perform(get("/api/reconciliation/differences")
                        .with(httpBasic("test", "test")))
                .andExpect(status().isOk());
    }

    @Test
    void getDifferencesByRunId_returnsList() throws Exception {
        when(reconciliationService.getReconciliationDifferencesByRunId(1L))
                .thenReturn(List.of(new ReconciliationDifference()));

        mockMvc.perform(get("/api/reconciliation/differences/1")
                        .with(httpBasic("test", "test")))
                .andExpect(status().isOk());
    }
}
