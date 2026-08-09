import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateCommunication() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    communicationType: "General",
    content: "",
    priority: "NORMAL",
    academicYear: "2026-27",
    classId: "",
    departmentId: "",
    publishAt: "",
    expiryAt: "",
    requireAcknowledgement: false,
    status: "DRAFT",
  });

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.content.trim()) {
      setError("Message is required");
      return;
    }

    if (!formData.publishAt) {
      setError("Publish date and time is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        communicationType: formData.communicationType,
        content: formData.content,
        priority: formData.priority,
        academicYear: formData.academicYear,
        classId: formData.classId
          ? Number(formData.classId)
          : null,
        departmentId: formData.departmentId
          ? Number(formData.departmentId)
          : null,
        publishAt: formData.publishAt,
        expiryAt: formData.expiryAt || null,
        requireAcknowledgement:
          formData.requireAcknowledgement,
        status: formData.status,
      };

      console.log("Creating communication:", payload);

      const response = await api.post(
        "/communications",
        payload
      );

      if (response.data.success) {
        setSuccess(
          "Communication created successfully!"
        );

        setTimeout(() => {
          navigate("/communications");
        }, 1000);
      }

    } catch (err) {
      console.error(
        "Create communication error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to create communication"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">

      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create Communication
        </h1>

        <p className="mt-2 text-slate-500">
          Create and publish a new school communication.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* SUCCESS */}

      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          {success}
        </div>
      )}

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        {/* TITLE */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Title *
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter communication title"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>

        {/* TYPE + PRIORITY */}

        <div className="mb-6 grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Communication Type *
            </label>

            <select
              name="communicationType"
              value={formData.communicationType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            >
              <option value="General">
                General
              </option>

              <option value="Event Information">
                Event Information
              </option>

              <option value="Academic">
                Academic
              </option>

              <option value="Announcement">
                Announcement
              </option>

              <option value="Emergency">
                Emergency
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Priority *
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            >
              <option value="NORMAL">
                Normal
              </option>

              <option value="IMPORTANT">
                Important
              </option>

              <option value="HIGH">
                High
              </option>

              <option value="URGENT">
                Urgent
              </option>
            </select>
          </div>

        </div>

        {/* CONTENT */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Message *
          </label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            placeholder="Write your communication..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>

        {/* ACADEMIC YEAR */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Academic Year
          </label>

          <input
            type="text"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            placeholder="2026-27"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>

        {/* DATES */}

        <div className="mb-6 grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Publish Date & Time *
            </label>

            <input
              type="datetime-local"
              name="publishAt"
              value={formData.publishAt}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Expiry Date & Time
            </label>

            <input
              type="datetime-local"
              name="expiryAt"
              value={formData.expiryAt}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

        </div>

        {/* STATUS */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          >
            <option value="DRAFT">
              Draft
            </option>

            <option value="SCHEDULED">
              Scheduled
            </option>

            <option value="PUBLISHED">
              Published
            </option>
          </select>
        </div>

        {/* ACKNOWLEDGEMENT */}

        <label className="mb-8 flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

          <input
            type="checkbox"
            name="requireAcknowledgement"
            checked={
              formData.requireAcknowledgement
            }
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-blue-600"
          />

          <div>
            <p className="text-sm font-semibold text-slate-700">
              Require acknowledgement
            </p>

            <p className="text-xs text-slate-500">
              Users will need to acknowledge this communication.
            </p>
          </div>

        </label>

        {/* BUTTONS */}

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">

          <button
            type="button"
            onClick={() =>
              navigate("/communications")
            }
            disabled={loading}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating..."
              : "Create Communication"}
          </button>

        </div>

      </form>
    </div>
  );
}