"use strict";

import db from "./db.js";

const createUserTable = `
    CREATE TABLE IF NOT EXISTS users 
    (id VARCHAR(50) PRIMARY KEY,
    fullName VARCHAR(30) NOT NULL,
    email VARCHAR(20) NOT NULL,
    phone NUMERIC(10) NOT NULL,
    password  VARCHAR(100) NOT NULL,
    role  VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

const createResturantTable = `
    CREATE TABLE IF NOT EXISTS resturants
    (id VARCHAR(50) PRIMARY KEY,
    creatorId VARCHAR(50),
    name VARCHAR(30) NOT NULL,
    description VARCHAR(500) NOT NULL,
    category VARCHAR(20) NOT NULL,
    address VARCHAR(20) NOT NULL,
    city VARCHAR(20) NOT NULL,
    state VARCHAR(20) NOT NULL,
    country VARCHAR(20) NOT NULL,
    zipCode VARCHAR(20) NOT NULL,
    phone NUMERIC(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    website VARCHAR(20),
    socialMedia JSONB,
    tags TEXT[],
    openTime VARCHAR(30) NOT NULL,
    daysOfOperation VARCHAR(20) NOT NULL,
    resturantPic VARCHAR(200),
    orderContact NUMERIC(20) NOT NULL,
    bookingContact NUMERIC(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

const createMenuTable = `
    CREATE TABLE IF NOT EXISTS  menu
    (id VARCHAR(50) PRIMARY KEY,
    resturantId VARCHAR(50),
    menuCategories VARCHAR(20),
    itemName VARCHAR(50),
    image  VARCHAR(200),
    ingredients  VARCHAR(30),
    description  VARCHAR(300),
    price  real,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

const createReviewTable = `
    CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    restaurant_id VARCHAR(50) NOT NULL,
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    response TEXT,
    responseBy VARCHAR(50),
    updatedBy VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

const createTableQuery = [createUserTable, createResturantTable, createMenuTable, createReviewTable];

async function createTables() {
  // Execute the table creation query
  try {
    
    // db.getDB().query("DROP TABLE IF EXISTS resturants");
    // db.getDB().query("DROP TABLE IF EXISTS users");
    // db.getDB().query("DROP TABLE IF EXISTS menu");
    // db.getDB().query("DROP TABLE IF EXISTS reviews");

    let queryArr = [];
    for (const table of createTableQuery) {
      queryArr.push(db.getDB().query(table));
    }
    // resolving all promises together
    const response = await Promise.allSettled(queryArr);
    for (const res of response) {
      // checking if there is and error creating table
      if (res.status == "rejected") {
        throw Error(JSON.stringify(res.reason.message || res.reason));
      }
    }
  } catch (err) {
    console.log("ERR[config/tables.js], func-createTables", err);
    process.exit(1);
  }
}

export default {
  createTables,
};
