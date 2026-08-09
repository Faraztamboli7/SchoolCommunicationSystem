const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db/database");

const authRoutes = require("./routes/authRoutes");
const communicationRoutes = require("./routes/communicationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const authenticateToken = require("./middleware/authMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// IMPORTANT:
// Body parsers MUST come BEFORE API routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// AUTH ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

// ==========================================
// COMMUNICATION ROUTES
// ==========================================

app.use("/api/communications", communicationRoutes);

//__________________________________________________
//__________________________________________
app.use(
  "/api/notifications",
  notificationRoutes
);
// ==========================================
// PROTECTED USER ROUTE
// ==========================================

app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, name, email, role, is_active
      FROM users
      WHERE id = $1
      `,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Fetch user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time"
    );

    res.json({
      success: true,
      message: "Backend is running",
      database: "Connected",
      time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("Global server error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});


// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("================================");
  console.error("GLOBAL SERVER ERROR");
  console.error("Message:", err.message);
  console.error("================================");

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});
// ==========================================
// SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});