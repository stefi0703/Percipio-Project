-- Disable foreign key checks to allow dropping tables in any order
--SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS reconciliation_difference;
DROP TABLE IF EXISTS reconciliation_run;
DROP TABLE IF EXISTS trade;
DROP TABLE IF EXISTS instrument;
DROP TABLE IF EXISTS audit_log;

--SET FOREIGN_KEY_CHECKS = 1;

-- Trade Table
CREATE TABLE IF NOT EXISTS trade (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     trade_id VARCHAR(255) NOT NULL,
    instrument VARCHAR(255) NOT NULL,
    price DECIMAL(18,4) NOT NULL,
    quantity INT NOT NULL,
    source_system VARCHAR(255) NOT NULL,
    trade_date DATE NOT NULL
    );

-- Instrument Table
CREATE TABLE IF NOT EXISTS instrument (
                                          id INT AUTO_INCREMENT PRIMARY KEY,
                                          symbol VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    isin VARCHAR(20) NOT NULL UNIQUE
    );

-- Reconciliation Run Table
CREATE TABLE IF NOT EXISTS reconciliation_run (
                                                  id INT AUTO_INCREMENT PRIMARY KEY,
                                                  run_date DATETIME NOT NULL,
                                                  status VARCHAR(20) NOT NULL,
    matched_count INT NOT NULL,
    unmatched_count INT NOT NULL
    );

-- Reconciliation Difference Table
CREATE TABLE IF NOT EXISTS reconciliation_difference (
                                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                                         trade_id VARCHAR(255) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    value_systema VARCHAR(255),
    value_systemb VARCHAR(255),
    reconciliation_run_id INT NOT NULL,
    CONSTRAINT fk_run_id FOREIGN KEY (reconciliation_run_id)
    REFERENCES reconciliation_run(id)
    ON DELETE CASCADE
    );

-- Audit Log Table
CREATE TABLE IF NOT EXISTS audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);