package org.team4.trading.instrument;

import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/instruments")
public class InstrumentController {

    private final InstrumentService instrumentService;

    public InstrumentController(InstrumentService instrumentService) {
        this.instrumentService = instrumentService;
    }

    @Operation(summary = "Get all instruments")
    @GetMapping
    public List<Instrument> getInstruments() {
        return instrumentService.getInstruments();
    }

    @Operation(summary = "Get an instrument by ID")
    @GetMapping("/{id}")
    public Optional<Instrument> getInstrument(@PathVariable("id") @Parameter(description = "ID of the instrument to retrieve", name = "id", required = true, example = "1") Long id) {
        return instrumentService.getInstrument(id);
    }

    @Operation(summary = "Create a new instrument")
    @PostMapping
    public Instrument createInstrument(@RequestBody Instrument instrument) {
        return instrumentService.createInstrument(instrument);
    }

    @Operation(summary = "Delete an existing instrument")
    @DeleteMapping("/{id}")
    public void deleteInstrument(@PathVariable("id") @Parameter(description = "ID of the instrument to delete", name = "id", required = true, example = "1") Long id) {
        instrumentService.deleteInstrument(id);
    }

    @Operation(summary = "Get an instrument by symbol")
    @GetMapping("/symbol/{symbol}")
    public Optional<Instrument> getInstrumentBySymbol(@PathVariable("symbol") @Parameter(description = "Symbol of the instrument to retrieve", name = "symbol", required = true, example = "AAPL") String symbol) {
        return instrumentService.getInstrumentBySymbol(symbol);
    }
}
