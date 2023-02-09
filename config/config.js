
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME || "root",
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE || "chat_bot",
        "host": process.env.DB_HOST || "./chat.db",
        "port": process.env.DB_PORT,
        "dialect": process.env.DB_CONNECTION || "sqlite"
    },
    "test": {
        "username": process.env.DB_USERNAME || "root",
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE || "chat_bot",
        "host": process.env.DB_HOST || "./chat.db",
        "port": process.env.DB_PORT,
        "dialect": process.env.DB_CONNECTION || "sqlite"
    },
    "production": {
        "username": process.env.DB_USERNAME || "root",
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE || "chat_bot",
        "host": process.env.DB_HOST || "./chat.db",
        "port": process.env.DB_PORT,
        "dialect": process.env.DB_CONNECTION || "sqlite"
    },
}
