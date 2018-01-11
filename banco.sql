CREATE TABLE IF NOT EXISTS contacts (
    id integer PRIMARY KEY,
    id_post text NOT NULL,
    status_posted text NOT NULL,
    time_int integer NOT NULL
);