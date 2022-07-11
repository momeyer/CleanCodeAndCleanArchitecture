import mysql from "promise-mysql";
import Connection from "./Connection";
const GREEN = "\u001b[32m";
const RESET = "\u001b[m";

export default class MySqlPromiseConnectionAdapter implements Connection {
  connection: any;

  async connect(): Promise<void> {
    this.connection = await mysql.createConnection({
      user: "root",
      password: "101086",
      database: "test",
    });
    console.log(GREEN, "connected to DB :D", RESET);
  }

  async query(statement: string): Promise<any> {
    return await this.connection.query(statement);
  }

  async close(): Promise<void> {
    await this.connection.end();
  }
}
