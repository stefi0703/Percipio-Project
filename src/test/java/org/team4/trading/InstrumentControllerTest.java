package org.team4.trading;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.team4.trading.config.SecurityConfig;
import org.team4.trading.instrument.Instrument;
import org.team4.trading.instrument.InstrumentController;
import org.team4.trading.instrument.InstrumentService;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.security.test.context.support.WithMockUser;

@WebMvcTest(InstrumentController.class)
@Import(SecurityConfig.class)
@WithMockUser(username = "user", roles = {"ADMIN"})

class InstrumentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InstrumentService instrumentService;

    @Test
    void getInstruments_returnsList() throws Exception {
        when(instrumentService.getInstruments()).thenReturn(List.of(new Instrument()));

        mockMvc.perform(get("/api/instruments")
                        .with(httpBasic("test", "test")))
                .andExpect(status().isOk());
    }

    @Test
    void getInstrument_returnsSingle() throws Exception {
        Instrument instrument = new Instrument();
        instrument.setId(1L);
        when(instrumentService.getInstrument(1L)).thenReturn(Optional.of(instrument));

        mockMvc.perform(get("/api/instruments/1")
                        .with(httpBasic("test", "test")))
                .andExpect(status().isOk());
    }

    @Test
    void createInstrument_returnsCreated() throws Exception {
        Instrument instrument = new Instrument();
        instrument.setId(1L);
        when(instrumentService.createInstrument(instrument)).thenReturn(instrument);

        mockMvc.perform(post("/api/instruments")
                        .with(httpBasic("admin", "admin"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":1}"))
                .andExpect(status().isOk());
    }
}
