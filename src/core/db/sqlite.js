import sqlite3 from "sqlite3";
import { open } from "sqlite";

class SQLITE {
  async connectToDatabase() {
    return open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });
  }

  async createTable() {
    const db = await this.connectToDatabase();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS session (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        proxy TEXT NOT NULL,
        device_id TEXT NOT NULL
      )
    `);

    await db.close();
  }

  async getSessionByProxy(proxy) {
    const db = await this.connectToDatabase();
    const rows = await db.all(
      `
      SELECT * FROM session
      WHERE proxy = ?
    `,
      [proxy]
    );
    await db.close();
    return rows[0];
  }

  async firstOrCreateSession(proxy, deviceId) {
    const db = await this.connectToDatabase();
    const existingData = await this.getSessionByProxy(proxy);
    if (existingData) {
      return existingData;
    }
    await db.run("INSERT INTO session (proxy, device_id) VALUES (?, ?)", [
      proxy,
      deviceId,
    ]);
    const newSession = await this.getSessionByProxy(proxy);
    return newSession;
  }
}

const sqlite = new SQLITE();
await sqlite.createTable();

export default sqlite;
