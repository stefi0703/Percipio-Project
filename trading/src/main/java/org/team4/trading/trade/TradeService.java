package org.team4.trading.trade;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradeService {

    private final TradeRepository tradeRepository;

    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    public List<Trade> getTrades() {
        return tradeRepository.findAll();
    }

    public Trade getTrade(Long id) {
        return tradeRepository.findById(id).orElse(null);
    }

    public Trade createTrade(Trade trade) {
        return tradeRepository.save(trade);
    }

    public void deleteTrade(Long id) {
        tradeRepository.deleteById(id);
    }

    //create trade from DTO
    public Trade createTradeDTO(TradeCreateDTO dto) {
        Trade trade = new Trade();
        trade.setInstrument(dto.getInstrument());
        trade.setPrice(dto.getPrice());
        trade.setQuantity(dto.getQuantity());
        trade.setSourceSystem(dto.getSourceSystem());
        trade.setTradeDate(dto.getTradeDate());
        return tradeRepository.save(trade);
    }
}
