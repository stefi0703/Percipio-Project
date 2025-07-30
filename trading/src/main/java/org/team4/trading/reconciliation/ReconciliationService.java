package org.team4.trading.reconciliation;

import org.springframework.stereotype.Service;
import org.team4.trading.audit.AuditService;
import org.team4.trading.trade.Trade;
import org.team4.trading.trade.TradeRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReconciliationService {

    private final TradeRepository tradeRepository;
    private final ReconciliationRunRepository reconciliationRunRepository;
    private final ReconciliationDifferenceRepository reconciliationDifferenceRepository;
    private final AuditService auditService;

    public ReconciliationService(TradeRepository tradeRepository, ReconciliationRunRepository reconciliationRunRepository, ReconciliationDifferenceRepository reconciliationDifferenceRepository, AuditService auditService) {
        this.tradeRepository = tradeRepository;
        this.reconciliationRunRepository = reconciliationRunRepository;
        this.reconciliationDifferenceRepository = reconciliationDifferenceRepository;
        this.auditService = auditService;
    }

    public ReconciliationRun reconcile() {
        auditService.log("INFO", "Starting reconciliation process.");
        List<Trade> trades = tradeRepository.findAll();
        Map<String, List<Trade>> tradesByTradeId = trades.stream().collect(Collectors.groupingBy(Trade::getTradeId));

        ReconciliationRun reconciliationRun = new ReconciliationRun();
        reconciliationRun.setRunDate(LocalDateTime.now());
        reconciliationRun.setStatus("COMPLETED");
        reconciliationRun.setMatchedCount(0);
        reconciliationRun.setUnmatchedCount(0);

        for (Map.Entry<String, List<Trade>> entry : tradesByTradeId.entrySet()) {
            List<Trade> tradeVersions = entry.getValue();
            if (tradeVersions.size() > 1) {
                Trade tradeA = tradeVersions.get(0);
                Trade tradeB = tradeVersions.get(1);

                if (!tradeA.getPrice().equals(tradeB.getPrice())) {
                    createDifference(reconciliationRun, entry.getKey(), "price", tradeA.getPrice().toString(), tradeB.getPrice().toString());
                }

                if (!tradeA.getQuantity().equals(tradeB.getQuantity())) {
                    createDifference(reconciliationRun, entry.getKey(), "quantity", tradeA.getQuantity().toString(), tradeB.getQuantity().toString());
                }
            }
        }

        reconciliationRun.setMatchedCount((int) tradesByTradeId.values().stream().filter(l -> l.size() == 1).count());
        reconciliationRun.setUnmatchedCount((int) tradesByTradeId.values().stream().filter(l -> l.size() > 1).count());

        auditService.log("INFO", "Reconciliation process completed.");
        return reconciliationRunRepository.save(reconciliationRun);
    }

    private void createDifference(ReconciliationRun reconciliationRun, String tradeId, String fieldName, String valueA, String valueB) {
        auditService.log("ERROR", "Mismatch found for trade " + tradeId + " on field " + fieldName);
        ReconciliationDifference difference = new ReconciliationDifference();
        difference.setReconciliationRun(reconciliationRun);
        difference.setTradeId(tradeId);
        difference.setFieldName(fieldName);
        difference.setValueSystemA(valueA);
        difference.setValueSystemB(valueB);
        reconciliationDifferenceRepository.save(difference);
    }

    public java.util.List<ReconciliationRun> getAllReconciliationRuns() {
        return reconciliationRunRepository.findAll();
    }

    public java.util.List<ReconciliationDifference> getReconciliationDifferencesByRunId(Long runId) {
        ReconciliationRun reconciliationRun = reconciliationRunRepository.findById(runId).orElse(null);
        if (reconciliationRun != null) {
            return reconciliationDifferenceRepository.findByReconciliationRun(reconciliationRun);
        }
        return java.util.Collections.emptyList();
    }

}
