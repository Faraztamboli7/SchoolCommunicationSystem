const bcrypt = require("bcryptjs");
const pool = require("./db/database");

const createStudent = async () => {
  try {
    const password = "Student@123";

    // Hash password using the same library as login
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (
        name,
        email,
        password_hash,
        role,
        is_active
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role, is_active
      `,
      [
        "Test Student",
        "student@school.com",
        passwordHash,
        "STUDENT",
        true
      ]
    );

    console.log("Student created successfully:");
    console.log(result.rows[0]);

    console.log("\nLogin credentials:");
    console.log("Email: student@school.com");
    console.log("Password: Student@123");

  } catch (error) {
    console.error("Error creating student:", error);
  } finally {
    await pool.end();
  }
};

createStudent();