package org.team4.trading.instrument;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/instruments")
public class InstrumentController {

    private final InstrumentService instrumentService;

    public InstrumentController(InstrumentService instrumentService) {
        this.instrumentService = instrumentService;
    }

    @GetMapping
    public List<Instrument> getInstruments() {
        return instrumentService.getInstruments();
    }

    @GetMapping("/{id}")
    public Optional<Instrument> getInstrument(@PathVariable Long id) {
        return instrumentService.getInstrument(id);
    }

    @PostMapping
    public Instrument createInstrument(@RequestBody Instrument instrument) {
        return instrumentService.createInstrument(instrument);
    }

    @DeleteMapping("/{id}")
    public void deleteInstrument(@PathVariable Long id) {
        instrumentService.deleteInstrument(id);
    }

    @GetMapping("/symbol/{symbol}")
    public Optional<Instrument> getInstrumentBySymbol(@PathVariable String symbol) {
        return instrumentService.getInstrumentBySymbol(symbol);
    }
}
