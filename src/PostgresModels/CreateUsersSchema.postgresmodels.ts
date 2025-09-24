import pool from "../Utils/PostgresConnection.utils.js";

(async () => {
    const query = `CREATE TABLE IF NOT EXISTS usersTalkApp (
        id SERIAL,
        email VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
    )`
    try {
        const response = await pool.query(query);
        const createIndexQuery = `CREATE INDEX IF NOT EXISTS idx_users_email ON usersTalkApp(email);`;
        const indexResponse = await pool.query(createIndexQuery);
    }
    catch(error) {
        console.error(error);
    }
})();