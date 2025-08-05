package org.team4.trading.instrument;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InstrumentRepository extends JpaRepository<Instrument, Long> {
    Optional<Instrument> findBySymbol(String symbol);
}
