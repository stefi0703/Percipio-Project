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

    @GetMapping("/{id}")
    public ReconciliationRun getReconciliationRun(@PathVariable Long id) {
        return reconciliationService.getReconciliationRun(id);
    }
}
