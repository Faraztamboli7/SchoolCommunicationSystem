const express = require("express");

const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get all notifications
router.get(
  "/",
  authenticateToken,
  getNotifications
);

// Get unread notification count
router.get(
  "/unread-count",
  authenticateToken,
  getUnreadCount
);

// Mark all as read
router.put(
  "/read-all",
  authenticateToken,
  markAllAsRead
);

// Mark one notification as read
router.put(
  "/:id/read",
  authenticateToken,
  markAsRead
);

module.exports = router;