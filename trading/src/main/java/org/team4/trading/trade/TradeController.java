package org.team4.trading.trade;

import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;

@RestController
@RequestMapping("/api/trades")
public class TradeController {

    private final TradeService tradeService;

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    @Operation(summary = "Get all trades")
    @GetMapping
    public List<Trade> getTrades() {
        return tradeService.getTrades();
    }

    @Operation(summary = "Get a trade by ID")
    @GetMapping("/{id}")
    public Trade getTrade(@PathVariable("id") @Parameter(description = "ID of the trade to retrieve", name = "id", required = true, example = "1") Long id) {
        return tradeService.getTrade(id);
    }

    @Operation(summary = "Create a new trade")
    @PostMapping
    public Trade createTrade(@RequestBody Trade trade) {
        return tradeService.createTrade(trade);
    }

    @Operation(summary = "Delete an existing trade")
    @DeleteMapping("/{id}")
    public void deleteTrade(@PathVariable("id") @Parameter(description = "ID of the trade to delete", name = "id", required = true, example = "1") Long id) {
        tradeService.deleteTrade(id);
    }
}
