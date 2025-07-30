package org.team4.trading.reconciliation;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reconciliation")
public class ReconciliationController {

    private final ReconciliationService reconciliationService;

    public ReconciliationController(ReconciliationService reconciliationService) {
        this.reconciliationService = reconciliationService;
    }

    @PostMapping("/start")
    public ReconciliationRun startReconciliation() {
        return reconciliationService.reconcile();
    }

    @GetMapping("/differences")
    public java.util.List<ReconciliationRun> getAllReconciliationRuns() {
        return reconciliationService.getAllReconciliationRuns();
    }

    @GetMapping("/differences/{id}")
    public java.util.List<ReconciliationDifference> getReconciliationDifferencesByRunId(@PathVariable Long id) {
        return reconciliationService.getReconciliationDifferencesByRunId(id);
    }
}
