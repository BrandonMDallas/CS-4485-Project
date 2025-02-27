/*
Run this query to create the widget_interests linking table.
This table establishes a many-to-many relationship between widgets and interests.
*/
CREATE TABLE IF NOT EXISTS widget_interests (
    widget_id INTEGER NOT NULL,
    interest_id INTEGER NOT NULL,
    PRIMARY KEY (widget_id, interest_id),
    FOREIGN KEY (widget_id) REFERENCES widgets(id),
    FOREIGN KEY (interest_id) REFERENCES interests(id)
);