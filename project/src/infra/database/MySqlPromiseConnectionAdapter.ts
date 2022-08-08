import mysql from "promise-mysql";
import Connection from "./Connection";
const GREEN = "\u001b[32m";
const RESET = "\u001b[m";

export default class MySqlPromiseConnectionAdapter implements Connection {
  connection: any;

  async connect(): Promise<void> {
    try {
      this.connection = await mysql.createConnection({
        user: "root",
        password: "password",
        database: "test",
      });
    } catch (error) {
      console.log("NO CONNECTION ", error);
    }
  }

  async query(statement: string): Promise<any> {
    return await this.connection.query(statement);
  }

  async close(): Promise<void> {
    await this.connection.end();
  }
}
