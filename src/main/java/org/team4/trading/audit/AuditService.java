package org.team4.trading.audit;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public AuditService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void log(String level, String message) {
        AuditLog auditLog = new AuditLog();
        auditLog.setTimestamp(LocalDateTime.now());
        auditLog.setLevel(level);
        auditLog.setMessage(message);
        auditLogRepository.save(auditLog);
    }

    public List<AuditLog> getLogs() {
        return auditLogRepository.findAll();
    }
}
