package org.team4.trading.reconciliation;

import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
@RequestMapping("/api/reconciliation")
public class ReconciliationController {

    private final ReconciliationService reconciliationService;

    public ReconciliationController(ReconciliationService reconciliationService) {
        this.reconciliationService = reconciliationService;
    }

    @Operation(summary = "Start a reconciliation run")
    @PostMapping("/start")
    public ReconciliationRun startReconciliation() {
        return reconciliationService.reconcile();
    }

    @Operation(summary = "Get all reconciliation runs")
    @GetMapping("/differences")
    public java.util.List<ReconciliationRun> getAllReconciliationRuns() {
        return reconciliationService.getAllReconciliationRuns();
    }

    @Operation(summary = "Get reconciliation differences by run ID")
    @GetMapping("/differences/{id}")
    public java.util.List<ReconciliationDifference> getReconciliationDifferencesByRunId(@PathVariable("id") @Parameter(description = "ID of the reconciliation run", name = "id", required = true, example = "1") Long id) {
        return reconciliationService.getReconciliationDifferencesByRunId(id);
    }
}
