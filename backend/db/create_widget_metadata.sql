/*
Run this query to create the widget_metadata table.
This table stores additional key/value pairs related to a widget.
*/

CREATE TABLE IF NOT EXISTS widget_metadata (
    id SERIAL PRIMARY KEY,
    widget_id INTEGER NOT NULL,
    meta_key VARCHAR(255) NOT NULL,
    meta_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (widget_id) REFERENCES widgets(id)
);