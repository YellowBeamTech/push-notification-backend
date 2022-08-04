
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
require('dotenv').config();

const config = {
    "name": process.env.NODE_ENV,
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "synchronize": true,
    "logging": true,
    "entities": ["src/entity/**/*.ts"],
    "migrations": ["src/migration/**/*.ts"],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migrations",
        "subscribersDir": "src/subscriber"
    }
}

console.log("MIRGRATION CONFIG thing", config);

module.exports = config;

// [
//   {
//     "name": "development",
//     "type": "postgres",
//     "host": "localhost",
//     "port": 5432,
//     "username": "user_erp",
//     "password": "postgres",
//     "database": "web_db",
//     "synchronize": true,
//     "logging": true,
//     "entities": ["src/entity/**/*.ts"],
//     "migrations": ["src/migration/**/*.ts"],
//     "subscribers": ["src/subscriber/**/*.ts"],
//     "cli": {
//       "entitiesDir": "src/entity",
//       "migrationsDir": "src/migration",
//       "subscribersDir": "src/subscriber"
//     }
//   },
//   {
//     "name": "test",
//     "type": "postgres",
//     "host": "localhost",
//     "port": 5432,
//     "username": "user_erp",
//     "password": "postgres",
//     "database": "web_db_test",
//     "synchronize": true,
//     "logging": false,
//     "dropSchema": true,
//     "entities": ["src/entity/**/*.ts"],
//     "migrations": ["src/migration/**/*.ts"],
//     "subscribers": ["src/subscriber/**/*.ts"],
//     "cli": {
//       "entitiesDir": "src/entity",
//       "migrationsDir": "src/migration",
//       "subscribersDir": "src/subscriber"
//     }
//   }
// ]
