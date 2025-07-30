package org.team4.trading.instrument;

import org.springframework.stereotype.Service;
import org.team4.trading.audit.AuditService;

import java.util.List;
import java.util.Optional;

@Service
public class InstrumentService {

    private final InstrumentRepository instrumentRepository;
    private final AuditService auditService;

    public InstrumentService(InstrumentRepository instrumentRepository, AuditService auditService) {
        this.instrumentRepository = instrumentRepository;
        this.auditService = auditService;
    }

    public List<Instrument> getInstruments() {
        return instrumentRepository.findAll();
    }

    public Instrument getInstrument(Long id) {
        return instrumentRepository.findById(id).orElse(null);
    }

    public Instrument createInstrument(Instrument instrument) {
        auditService.log("INFO", "Creating instrument: " + instrument.getSymbol());
        return instrumentRepository.save(instrument);
    }

    public void deleteInstrument(Long id) {
        auditService.log("INFO", "Deleting instrument: " + id);
        instrumentRepository.deleteById(id);
    }

    public Instrument getInstrumentBySymbol(String symbol) {
        return instrumentRepository.findBySymbol(symbol).orElse(null);
    }
}
