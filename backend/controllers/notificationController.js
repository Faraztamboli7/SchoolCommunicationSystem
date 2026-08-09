const pool = require("../db/database");

// ==========================================
// GET USER NOTIFICATIONS
// ==========================================

const getNotifications = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        n.id,
        n.title,
        n.message,
        n.type,
        n.is_read,
        n.communication_id,
        n.created_at,

        c.title AS communication_title

      FROM notifications n

      LEFT JOIN communications c
        ON n.communication_id = c.id

      WHERE n.user_id = $1

      ORDER BY n.created_at DESC
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      notifications: result.rows,
    });

  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};


// ==========================================
// GET UNREAD COUNT
// ==========================================

const getUnreadCount = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM notifications
      WHERE user_id = $1
      AND is_read = FALSE
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      count: Number(result.rows[0].count),
    });

  } catch (error) {
    console.error("Get unread count error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch unread count",
    });
  }
};


// ==========================================
// MARK ONE NOTIFICATION AS READ
// ==========================================

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE notifications
      SET is_read = TRUE
      WHERE id = $1
      AND user_id = $2
      RETURNING *
      `,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification marked as read",
      notification: result.rows[0],
    });

  } catch (error) {
    console.error("Mark notification read error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};


// ==========================================
// MARK ALL NOTIFICATIONS AS READ
// ==========================================

const markAllAsRead = async (req, res) => {
  try {
    await pool.query(
      `
      UPDATE notifications
      SET is_read = TRUE
      WHERE user_id = $1
      AND is_read = FALSE
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      message: "All notifications marked as read",
    });

  } catch (error) {
    console.error("Mark all notifications read error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update notifications",
    });
  }
};


module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};