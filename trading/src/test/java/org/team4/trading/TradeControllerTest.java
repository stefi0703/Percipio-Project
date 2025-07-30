package org.team4.trading;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.team4.trading.config.SecurityConfig;
import org.team4.trading.trade.Trade;
import org.team4.trading.trade.TradeController;
import org.team4.trading.trade.TradeService;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import org.springframework.security.test.context.support.WithMockUser;

@WebMvcTest(TradeController.class)
@Import(SecurityConfig.class)

class TradeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TradeService tradeService;

    @Test
    void getTrades_returnsList() throws Exception {
        when(tradeService.getTrades()).thenReturn(List.of(new Trade()));

        mockMvc.perform(get("/api/trades"))
                .andExpect(status().isOk());
    }

    @Test
    void getTrade_returnsSingle() throws Exception {
        Trade trade = new Trade();
        trade.setId(1L);
        when(tradeService.getTrade(1L)).thenReturn(trade);

        mockMvc.perform(get("/api/trades/1"))
                .andExpect(status().isOk());
    }

    @Test
    void createTrade_returnsCreated() throws Exception {
        Trade trade = new Trade();
        trade.setId(1L);
        when(tradeService.createTrade(trade)).thenReturn(trade);

        mockMvc.perform(post("/api/trades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":1}"))
                .andExpect(status().isOk());
    }
}
