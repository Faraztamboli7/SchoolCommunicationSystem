const bcrypt = require("bcryptjs");
require("dotenv").config();

const pool = require("./db/database");

const createAdmin = async () => {
  try {
    const email = "admin@school.com";
    const password = "admin123";

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      console.log("⚠️ Admin user already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `
      INSERT INTO users
      (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role
      `,
      [
        "Admin User",
        email,
        passwordHash,
        "ADMIN",
      ]
    );

    console.log("✅ Admin created:");
    console.log(result.rows[0]);

    process.exit(0);

  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    process.exit(1);
  }
};

createAdmin();