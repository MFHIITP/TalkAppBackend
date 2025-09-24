import pool from "../Utils/PostgresConnection.utils.js";

(async () => {
    const query = `CREATE TABLE IF NOT EXISTS emailChatMap (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        chatname VARCHAR(255) NOT NULL UNIQUE
    )`;
    try {
        const response = await pool.query(query);
        const createIndexQuery = `CREATE INDEX IF NOT EXISTS idx_email_chat_map ON emailChatMap(id);`;
        const indexResponse = await pool.query(createIndexQuery);
    }
    catch (error) {
        console.error(error);
    }
})();