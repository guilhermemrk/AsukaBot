const CreateDB = (m_db) => {
  db.run(`CREATE TABLE IF NOT EXISTS "donators" (
    "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "serverid"	TEXT NOT NULL,
    "userid"	TEXT NOT NULL,
    "username"	TEXT NOT NULL,
    "entryDate"	TEXT NOT NULL,
    "expireDate"	TEXT NOT NULL,
    "timeBought"	INTEGER NOT NULL,
    "tier"	INTEGER NOT NULL
  )`);
}

module.exports = { CreateDB }
