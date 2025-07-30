
CREATE TABLE IF NOT EXISTS trade (
    id SERIAL PRIMARY KEY,
    trade_id VARCHAR(255) NOT NULL,
    instrument VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    quantity INTEGER NOT NULL,
    source_system VARCHAR(255) NOT NULL,
    trade_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS instrument (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    isin VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS reconciliation_run (
    id SERIAL PRIMARY KEY,
    run_date TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    matched_count INTEGER NOT NULL,
    unmatched_count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS reconciliation_difference (
    id SERIAL PRIMARY KEY,
    trade_id VARCHAR(255) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    value_system_a VARCHAR(255),
    value_system_b VARCHAR(255),
    reconciliation_run_id INTEGER NOT NULL,
    FOREIGN KEY (reconciliation_run_id) REFERENCES reconciliation_run(id)
);
