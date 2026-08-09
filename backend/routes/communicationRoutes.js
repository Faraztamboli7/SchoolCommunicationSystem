const express = require("express");

const {
  createCommunication,
  getCommunications,
  getCommunicationById,
  deleteCommunication,
} = require("../controllers/communicationController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// GET ALL COMMUNICATIONS
// ==========================================

router.get(
  "/",
  authenticateToken,
  getCommunications
);

// ==========================================
// GET SINGLE COMMUNICATION
// ==========================================

router.get(
  "/:id",
  authenticateToken,
  getCommunicationById
);

// ==========================================
// CREATE COMMUNICATION
// ==========================================

router.post(
  "/",
  authenticateToken,
  createCommunication
);

// ==========================================
// DELETE COMMUNICATION
// ==========================================

router.delete(
  "/:id",
  authenticateToken,
  deleteCommunication
);


module.exports = router;