import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import { db } from "@vercel/postgres";
import Cryptr from "cryptr";
import cors from "cors";
env.config();

//const owasp = require("owasp-password-strength-test");

const app = express();
/*const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});*/

const cryptr = new Cryptr(process.env.CRYPTR);

//var user = null;

/*const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});*/

//db.connect();
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
/*app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());*/

/*app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    //return cb(null, null);
  });
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(userProfileURL);
        user = profile;
        const result = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [profile.email]
        );
        if (result.rows.length === 0) {
          await pool.query("INSERT INTO users (email) VALUES ($1)", [
            profile.email,
          ]);
        }
        return cb(null, profile);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get("/api/current_user", (req, res) => {
  res.send(user);
});

app.get("/api/logout", (req, res) => {
  req.logout();
  user = null;
  res.redirect("/");
});

app.get("/api/check-password", (req, res) => {
  try {
    const { password } = req.body;
    const tested = owasp.test(password);
    const isStrong = tested.strong;
    //const errors = tested.errors;
    console.log("YES");
    res.json({ status: isStrong ? "Strong" : "Weak" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/generate-password", (req, res) => {
  res.json({ pass: "YiufsjadYUN4Y5T4YTynudc46488fas13v13sad484684KDFH" });
});*/

/*const connectToDb = async () => {
  const client = await db.connect();
  // Rest of the code that uses the client connection
  const val = await client.sql`CREATE TABLE IF NOT EXISTS secrets(
    email TEXT PRIMARY KEY, key TEXT, secret TEXT)`;
  console.log(val);
};

connectToDb();*/

app.post("/api/auth", async (req, res) => {
  try {
    const { email } = req.body;
    const client = await db.connect();
    const result =
      await client.sql`SELECT * FROM users WHERE email = ${email};`;
    if (result.rows.length === 0) {
      await client.sql`INSERT INTO users (email) VALUES (${email});`;
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/secrets/add", async (req, res) => {
  try {
    //if (req.isAuthenticated()) {
    const client = await db.connect();
    const { email, key, secret } = req.body;
    //const encryptedString = cryptr.encrypt(key);
    const encryptedSecret = cryptr.encrypt(secret);
    const result =
      await client.sql`SELECT * FROM secrets WHERE email = ${email} AND key = ${key};`;
    if (result.rows.length === 0) {
      await client.sql`INSERT INTO secrets (email, key, secret) VALUES (${email}, ${key}, ${encryptedSecret});`;
      res.json({ message: "Secret added successfully" });
    } else {
      res.json({ message: "Key is already present in the database" });
    }
    /*} else {
      res.json({ message: "You need to Sign Up/Sign In" });
    }*/
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/secrets/read", async (req, res) => {
  try {
    //if (req.isAuthenticated()) {
    const client = await db.connect();
    const { email, key } = req.body;
    //const encryptedString = cryptr.encrypt(key);
    const result =
      await client.sql`SELECT * FROM secrets WHERE email = ${email} AND key = ${key};`;
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
    /*} else {
      res.json({ message: "You need to Sign Up/Sign In", secret: "" });
    }*/
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/secrets/modify", async (req, res) => {
  try {
    //if (req.isAuthenticated()) {
    const client = await db.connect();
    const { email, key, secret } = req.body;
    //const encryptedString = cryptr.encrypt(key);
    const encryptedSecret = cryptr.encrypt(secret);
    const result =
      await client.sql`SELECT * FROM secrets WHERE email = ${email} AND key = ${key};`;
    if (result.rows.length === 1) {
      await client.sql`UPDATE secrets SET secret = ${encryptedSecret} WHERE email = ${email} AND key = ${key};`;
      res.json({ message: "Secret modified successfully" });
    } else {
      res.json({ message: "Key is not present in the database" });
    }
    /*} else {
      res.json({ message: "You need to Sign Up/Sign In" });
    }*/
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/secrets/delete", async (req, res) => {
  try {
    //if (req.isAuthenticated()) {
    const client = await db.connect();
    const { email, key } = req.body;
    //const encryptedString = cryptr.encrypt(key);
    const result =
      await client.sql`SELECT * FROM secrets WHERE email = ${email} AND key = ${key};`;
    if (result.rows.length === 1) {
      await client.sql`DELETE FROM secrets WHERE email = ${email} AND key = ${key};`;
      res.json({ message: "Secret deleted successfully" });
    } else {
      res.json({ message: "Key is not present in the database" });
    }
    /*} else {
      res.json({ message: "You need to Sign Up/Sign In" });
    }*/
  } catch (err) {
    console.log(err);
  }
});

/*passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});*/

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
