CREATE DATABASE weather_here;

CREATE TABLE weather (
    id SERIAL NOT NULL PRIMARY KEY,
    latitude real,
    longitude real,
    conditions varchar(255),
    temperature real,
    humidity varchar(255),
    location varchar(255),
    timestamp timestamp
);