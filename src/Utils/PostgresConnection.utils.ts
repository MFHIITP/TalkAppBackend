import pkg from "pg";
import config from "../config.js";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: config.POSTGRES_URL
});

(async () => {
    try {
        const connection = await pool.query("SELECT NOW()");
        console.log("PostgreSQL connected successfully", connection.rows[0].now);
    }
    catch(error) {
        console.error("PostgreSQL connection falied", error);
    }
})();

export default pool;