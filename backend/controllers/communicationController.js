const pool = require("../db/database");

const createCommunication = async (req, res) => {
  try {
    console.log("================================");
    console.log("CREATE COMMUNICATION REQUEST");
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    console.log("================================");

    const {
      title,
      communicationType,
      content,
      message,
      priority,
      academicYear,
      classId,
      departmentId,
      publishAt,
      expiryAt,
      requireAcknowledgement,
      status,
    } = req.body || {};

    // ==========================================
    // CONTENT
    // ==========================================

    // Support both "content" and "message"
    // so your existing frontend/Postman body can still work.
    const communicationContent = content || message;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!communicationType) {
      return res.status(400).json({
        success: false,
        message: "Communication type is required",
      });
    }

    if (!communicationContent || !communicationContent.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (!priority) {
      return res.status(400).json({
        success: false,
        message: "Priority is required",
      });
    }

    if (!publishAt) {
      return res.status(400).json({
        success: false,
        message: "Publish date and time is required",
      });
    }

    // ==========================================
    // DATE VALIDATION
    // ==========================================

    const publishDate = new Date(publishAt);

    if (isNaN(publishDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid publish date",
      });
    }

    let expiryDate = null;

    if (expiryAt) {
      expiryDate = new Date(expiryAt);

      if (isNaN(expiryDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid expiry date",
        });
      }

      if (expiryDate <= publishDate) {
        return res.status(400).json({
          success: false,
          message: "Expiry date must be after publish date",
        });
      }
    }

    // ==========================================
    // DETERMINE STATUS
    // ==========================================

    let communicationStatus = status || "DRAFT";

    if (communicationStatus === "SCHEDULED") {
      if (publishDate <= new Date()) {
        communicationStatus = "PUBLISHED";
      }
    }

    // ==========================================
    // INSERT COMMUNICATION
    // ==========================================

    const result = await pool.query(
      `
      INSERT INTO communications (
        title,
        communication_type,
        content,
        priority,
        status,
        created_by,
        academic_year,
        class_id,
        department_id,
        publish_at,
        expiry_at,
        require_acknowledgement
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12
      )
      RETURNING *
      `,
      [
        title.trim(),
        communicationType,
        communicationContent.trim(),
        priority,
        communicationStatus,
        req.user.id,
        academicYear || null,
        classId || null,
        departmentId || null,
        publishDate,
        expiryDate,
        requireAcknowledgement || false,
      ]
    );

//-===================================================


    // ==========================================
// CREATE NOTIFICATIONS
// ==========================================

try {
  const communication = result.rows[0];

  // Get all active users except the creator
  const usersResult = await pool.query(
    `
    SELECT id
    FROM users
    WHERE is_active = TRUE
    AND id != $1
    `,
    [req.user.id]
  );

  for (const user of usersResult.rows) {
    await pool.query(
      `
      INSERT INTO notifications (
        user_id,
        title,
        message,
        type,
        communication_id
      )
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        user.id,
        "New Communication",
        communication.title,
        "INFO",
        communication.id,
      ]
    );
  }

} catch (notificationError) {
  console.error(
    "Notification creation error:",
    notificationError
  );
}

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "Communication created successfully",
      communication: result.rows[0],
    });

  } catch (error) {
    console.error("================================");
    console.error("CREATE COMMUNICATION ERROR");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Detail:", error.detail);
    console.error("Hint:", error.hint);
    console.error("================================");

    return res.status(500).json({
      success: false,
      message: "Failed to create communication",
      error: error.message,
    });
  }
};

const getCommunications = async (req, res) => {
  try {
    console.log("================================");
    console.log("GET COMMUNICATIONS REQUEST");
    console.log("User:", req.user);
    console.log("================================");

    const result = await pool.query(`
      SELECT
        c.id,
        c.title,
        c.communication_type,
        c.content,
        c.priority,
        c.status,
        c.created_by,
        c.academic_year,
        c.class_id,
        c.department_id,
        c.publish_at,
        c.expiry_at,
        c.require_acknowledgement,
        c.created_at,
        c.updated_at,
        u.name AS created_by_name
      FROM communications c
      LEFT JOIN users u
        ON c.created_by = u.id
      ORDER BY c.created_at DESC
    `);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      communications: result.rows,
    });

  } catch (error) {
    console.error("================================");
    console.error("GET COMMUNICATIONS ERROR");
    console.error("Message:", error.message);
    console.error("================================");

    return res.status(500).json({
      success: false,
      message: "Failed to fetch communications",
    });
  }
};

const getCommunicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        c.id,
        c.title,
        c.communication_type,
        c.content,
        c.priority,
        c.status,
        c.created_by,
        c.academic_year,
        c.class_id,
        c.department_id,
        c.publish_at,
        c.expiry_at,
        c.require_acknowledgement,
        c.created_at,
        c.updated_at,
        u.name AS created_by_name
      FROM communications c
      LEFT JOIN users u
        ON c.created_by = u.id
      WHERE c.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Communication not found",
      });
    }

    return res.status(200).json({
      success: true,
      communication: result.rows[0],
    });

  } catch (error) {
    console.error(
      "GET COMMUNICATION BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch communication",
    });
  }
};

const updateCommunication = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      communicationType,
      content,
      message,
      priority,
      academicYear,
      classId,
      departmentId,
      publishAt,
      expiryAt,
      requireAcknowledgement,
      status,
    } = req.body || {};

    const communicationContent =
      content || message;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!communicationType) {
      return res.status(400).json({
        success: false,
        message: "Communication type is required",
      });
    }

    if (
      !communicationContent ||
      !communicationContent.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (!priority) {
      return res.status(400).json({
        success: false,
        message: "Priority is required",
      });
    }

    if (!publishAt) {
      return res.status(400).json({
        success: false,
        message: "Publish date and time is required",
      });
    }

    // ==========================================
    // DATE VALIDATION
    // ==========================================

    const publishDate = new Date(publishAt);

    if (isNaN(publishDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid publish date",
      });
    }

    let expiryDate = null;

    if (expiryAt) {
      expiryDate = new Date(expiryAt);

      if (isNaN(expiryDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid expiry date",
        });
      }

      if (expiryDate <= publishDate) {
        return res.status(400).json({
          success: false,
          message:
            "Expiry date must be after publish date",
        });
      }
    }

    // ==========================================
    // CHECK EXISTING COMMUNICATION
    // ==========================================

    const existing = await pool.query(
      `
      SELECT id
      FROM communications
      WHERE id = $1
      `,
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Communication not found",
      });
    }

    // ==========================================
    // UPDATE
    // ==========================================

    const result = await pool.query(
      `
      UPDATE communications
      SET
        title = $1,
        communication_type = $2,
        content = $3,
        priority = $4,
        status = $5,
        academic_year = $6,
        class_id = $7,
        department_id = $8,
        publish_at = $9,
        expiry_at = $10,
        require_acknowledgement = $11,
        updated_at = NOW()
      WHERE id = $12
      RETURNING *
      `,
      [
        title.trim(),
        communicationType,
        communicationContent.trim(),
        priority,
        status || "DRAFT",
        academicYear || null,
        classId || null,
        departmentId || null,
        publishDate,
        expiryDate,
        requireAcknowledgement || false,
        id,
      ]
    );

    return res.status(200).json({
      success: true,
      message:
        "Communication updated successfully",
      communication: result.rows[0],
    });

  } catch (error) {
    console.error(
      "UPDATE COMMUNICATION ERROR:"
    );

    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Detail:", error.detail);

    return res.status(500).json({
      success: false,
      message: "Failed to update communication",
    });
  }
};

const deleteCommunication = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM communications
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Communication not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Communication deleted successfully",
    });

  } catch (error) {
    console.error(
      "DELETE COMMUNICATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete communication",
    });
  }
};


// ==========================================
// GET SINGLE COMMUNICATION
// ==========================================




// ==========================================
// DELETE COMMUNICATION
// ==========================================




module.exports = {
  createCommunication,
  getCommunications,
  getCommunicationById,
  deleteCommunication,
};