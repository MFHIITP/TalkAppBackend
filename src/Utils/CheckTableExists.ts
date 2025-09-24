import pool from "./PostgresConnection.utils.js";

const checkTableExists = async (tableName: string): Promise<boolean> => {
    try {
        const query = `SELECT EXISTS (
            SELECT 1 
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = $1
        ) AS EXISTS;`
        const response = await pool.query(query, [tableName]);
        return response.rows[0].exists;
    }
    catch(error) {
        return false;
    }
}
export default checkTableExists;