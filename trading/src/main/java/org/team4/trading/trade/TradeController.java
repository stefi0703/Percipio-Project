package org.team4.trading.trade;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trades")
public class TradeController {

    private final TradeService tradeService;

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    @GetMapping
    public List<Trade> getTrades() {
        return tradeService.getTrades();
    }

    @GetMapping("/{id}")
    public Trade getTrade(@PathVariable Long id) {
        return tradeService.getTrade(id);
    }

    @PostMapping
    public Trade createTrade(@RequestBody Trade trade) {
        return tradeService.createTrade(trade);
    }

    @DeleteMapping("/{id}")
    public void deleteTrade(@PathVariable Long id) {
        tradeService.deleteTrade(id);
    }
}
