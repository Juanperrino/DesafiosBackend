const sqliteOptions = {
    client: "sqlite3",
    connection: {
        filename: "./db/db.sqlite"
    },
    useNullAsDefault: true
}

const mariadbOptions = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: process.env.NODE_USER || "root",
        password: process.env.NODE_PASS || "",
        database: process.env.NODE_DB || "ecommerce"
    },
    pool: {
        min: 0,
        max: 7
    }
}

module.exports = {
    sqliteOptions,
    mariadbOptions
}