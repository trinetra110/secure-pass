import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import { db } from "@vercel/postgres";
import Cryptr from "cryptr";
import cors from "cors";
env.config();

const app = express();
const cryptr = new Cryptr(process.env.CRYPTR);

app.use(cors());
app.use(bodyParser.json());

/*const connectToDb = async () => { //for doing any changes directly to the vercel database
  const client = await db.connect();
  // Rest of the code that uses the client connection
  const val = await client.sql`CREATE TABLE IF NOT EXISTS secret(
    email TEXT, key TEXT, secret TEXT)`;
  console.log(val);
};

connectToDb();
*/
app.post("/api/auth", async (req, res) => {
  try {
    const { email } = req.body;
    const client = await db.connect();
    const result =
      await client.sql`SELECT * FROM users WHERE email = ${email};`;
    if (result.rows.length === 0) {
      await client.sql`INSERT INTO users (email) VALUES (${email});`;
    }
    res.json("Ok");
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/secrets/add", async (req, res) => {
  try {
    const client = await db.connect();
    const { email, key, secret } = req.body;
    const encryptedSecret = cryptr.encrypt(secret);
    const result =
      await client.sql`SELECT * FROM secret WHERE email = ${email} AND key = ${key};`;
    if (result.rows.length === 0) {
      await client.sql`INSERT INTO secret (email, key, secret) VALUES (${email}, ${key}, ${encryptedSecret});`;
      res.json({ message: "Secret added successfully" });
    } else {
      res.json({ message: "Key is already present in the database" });
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/secrets/read", async (req, res) => {
  try {
    const client = await db.connect();
    const email = req.body.email;
    const key = req.body.key;
    const result =
      await client.sql`SELECT * FROM secret WHERE email = ${email} AND key = ${key};`;
    if (result.rows.length === 0) {
      res.json({
        message: "No such key is present in the database",
        secret: "",
      });
    } else {
      const decryptedSecret = cryptr.decrypt(result.rows[0].secret);
      res.json({
        message: "Data fetched successfully",
        secret: decryptedSecret,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/secrets/modify", async (req, res) => {
  try {
    const client = await db.connect();
    const { email, key, secret } = req.body;
    const encryptedSecret = cryptr.encrypt(secret);
    const result =
      await client.sql`SELECT * FROM secret WHERE email = ${email} AND key = ${key};`;
    if (result.rows.length === 1) {
      await client.sql`UPDATE secret SET secret = ${encryptedSecret} WHERE email = ${email} AND key = ${key};`;
      res.json({ message: "Secret modified successfully" });
    } else {
      res.json({ message: "Key is not present in the database" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/secrets/delete", async (req, res) => {
  try {
    const client = await db.connect();
    const { email, key } = req.body;
    const result =
      await client.sql`SELECT * FROM secret WHERE email = ${email} AND key = ${key};`;
    if (result.rows.length === 1) {
      await client.sql`DELETE FROM secret WHERE email = ${email} AND key = ${key};`;
      res.json({ message: "Secret deleted successfully" });
    } else {
      res.json({ message: "Key is not present in the database" });
    }
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
