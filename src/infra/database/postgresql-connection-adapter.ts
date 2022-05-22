import Connection from "./connection";
import pgp from 'pg-promise';

export default class PostgresqlConnectionAdapter implements Connection{
    connection: any;

    constructor() {
        this.connection = pgp()('postgres://postgres:Daneve2130@localhost:5432/ecommerce');
    }

    query(statement: string, params?: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    async close(): Promise<void> {
        this.connection.$pool.end();
    }
}