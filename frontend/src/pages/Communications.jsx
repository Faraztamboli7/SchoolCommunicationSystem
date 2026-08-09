import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

export default function Communications() {
  const [communications, setCommunications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCommunication, setSelectedCommunication] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // ==========================================
  // FETCH COMMUNICATIONS
  // ==========================================

  useEffect(() => {
    fetchCommunications();
  }, []);

  const fetchCommunications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/communications");

      console.log("Communications:", response.data);

      if (response.data.success) {
        setCommunications(response.data.communications);
      }
    } catch (err) {
      console.error("Failed to fetch communications:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load communications"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VIEW COMMUNICATION
  // ==========================================

  const handleView = async (id) => {
    try {
      setError("");

      const response = await api.get(
        `/communications/${id}`
      );

      if (response.data.success) {
        setSelectedCommunication(
          response.data.communication
        );

        setShowViewModal(true);
      }
    } catch (err) {
      console.error(
        "Failed to fetch communication:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load communication"
      );
    }
  };

  // ==========================================
  // DELETE COMMUNICATION
  // ==========================================

  const handleDelete = async () => {
    if (!selectedCommunication) return;

    try {
      setDeleteLoading(true);
      setError("");

      const response = await api.delete(
        `/communications/${selectedCommunication.id}`
      );

      if (response.data.success) {
        setCommunications((previous) =>
          previous.filter(
            (item) =>
              item.id !== selectedCommunication.id
          )
        );

        setShowDeleteModal(false);
        setSelectedCommunication(null);
      }
    } catch (err) {
      console.error(
        "Failed to delete communication:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete communication"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // ==========================================
  // FILTER COMMUNICATIONS
  // ==========================================

  const filteredCommunications = useMemo(() => {
    return communications.filter((communication) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        communication.title
          ?.toLowerCase()
          .includes(searchText) ||
        communication.content
          ?.toLowerCase()
          .includes(searchText) ||
        communication.communication_type
          ?.toLowerCase()
          .includes(searchText) ||
        communication.created_by_name
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        communication.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        communication.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    communications,
    search,
    statusFilter,
    priorityFilter,
  ]);

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
  };

  const hasFilters =
    search ||
    statusFilter !== "ALL" ||
    priorityFilter !== "ALL";

  // ==========================================
  // PRIORITY STYLE
  // ==========================================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-50 text-red-600 border-red-100";

      case "HIGH":
        return "bg-orange-50 text-orange-600 border-orange-100";

      case "IMPORTANT":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";

      case "NORMAL":
        return "bg-green-50 text-green-600 border-green-100";

      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-50 text-green-600";

      case "SCHEDULED":
        return "bg-blue-50 text-blue-600";

      case "DRAFT":
        return "bg-slate-100 text-slate-600";

      case "EXPIRED":
        return "bg-red-50 text-red-600";

      case "ARCHIVED":
        return "bg-purple-50 text-purple-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div>
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Communications
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and monitor all school communications.
          </p>
        </div>

        <button
          onClick={fetchCommunications}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className={loading ? "animate-spin" : ""}>
            ↻
          </span>

          Refresh
        </button>
      </div>

      {/* =====================================
          STATS
      ===================================== */}

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Communications
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {communications.length}
          </p>
        </div>

        {/* DRAFTS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Drafts
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {
              communications.filter(
                (item) => item.status === "DRAFT"
              ).length
            }
          </p>
        </div>

        {/* SCHEDULED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Scheduled
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {
              communications.filter(
                (item) => item.status === "SCHEDULED"
              ).length
            }
          </p>
        </div>

        {/* PUBLISHED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Published
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {
              communications.filter(
                (item) => item.status === "PUBLISHED"
              ).length
            }
          </p>
        </div>
      </div>

      {/* =====================================
          FILTER BAR
      ===================================== */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row">
          {/* SEARCH */}

          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search communications..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          >
            <option value="ALL">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="PUBLISHED">Published</option>
            <option value="EXPIRED">Expired</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          {/* PRIORITY */}

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          >
            <option value="ALL">All Priorities</option>
            <option value="NORMAL">Normal</option>
            <option value="IMPORTANT">Important</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          {/* CLEAR */}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Clear
            </button>
          )}
        </div>

        {/* RESULT COUNT */}

        <div className="mt-4 text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {filteredCommunications.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">
            {communications.length}
          </span>{" "}
          communications
        </div>
      </div>

      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      )}

      {/* =====================================
          ERROR
      ===================================== */}

      {!loading && error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="font-semibold text-red-700">
            Unable to load communications
          </h3>

          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={fetchCommunications}
            className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* =====================================
          EMPTY STATE
      ===================================== */}

      {!loading &&
        !error &&
        filteredCommunications.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              📢
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No communications found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Try changing your search or filters.
            </p>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

      {/* =====================================
          COMMUNICATION CARDS
      ===================================== */}

      {!loading &&
        !error &&
        filteredCommunications.length > 0 && (
          <div className="grid gap-4">
            {filteredCommunications.map(
              (communication) => (
                <div
                  key={communication.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                >
                  {/* TOP ROW */}

                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                          {communication.communication_type}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            communication.status
                          )}`}
                        >
                          {communication.status}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
                        {communication.title}
                      </h2>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${getPriorityStyle(
                        communication.priority
                      )}`}
                    >
                      {communication.priority}
                    </span>
                  </div>

                  {/* CONTENT */}

                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                    {communication.content}
                  </p>

                  {/* DETAILS */}

                  <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Created By
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {communication.created_by_name ||
                          "Admin"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Academic Year
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {communication.academic_year ||
                          "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Publish Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {communication.publish_at
                          ? new Date(
                              communication.publish_at
                            ).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Created
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {communication.created_at
                          ? new Date(
                              communication.created_at
                            ).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {/* ACKNOWLEDGEMENT */}

                  {communication.require_acknowledgement && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                        ✓
                      </span>

                      Acknowledgement required
                    </div>
                  )}

                  {/* ACTIONS */}

                  <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
                    <button
                      onClick={() =>
                        handleView(communication.id)
                      }
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      👁 View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCommunication(
                          communication
                        );
                        setShowDeleteModal(true);
                      }}
                      className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}

      {/* ==========================================
          VIEW COMMUNICATION MODAL
      ========================================== */}

      {showViewModal && selectedCommunication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  {
                    selectedCommunication.communication_type
                  }
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {selectedCommunication.title}
                </h2>
              </div>

              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedCommunication(null);
                }}
                className="rounded-xl px-3 py-2 text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}

            <div className="space-y-6 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Content
                </p>

                <p className="mt-2 leading-7 text-slate-700">
                  {selectedCommunication.content}
                </p>
              </div>

              {/* STATUS + PRIORITY */}

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Status
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedCommunication.status}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Priority
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedCommunication.priority}
                  </p>
                </div>
              </div>

              {/* DETAILS */}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Created By
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {selectedCommunication.created_by_name ||
                      "Admin"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Academic Year
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {selectedCommunication.academic_year ||
                      "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Publish Date
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {selectedCommunication.publish_at
                      ? new Date(
                          selectedCommunication.publish_at
                        ).toLocaleString()
                      : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Expiry Date
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {selectedCommunication.expiry_at
                      ? new Date(
                          selectedCommunication.expiry_at
                        ).toLocaleString()
                      : "—"}
                  </p>
                </div>
              </div>

              {selectedCommunication.require_acknowledgement && (
                <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
                  ✓ Acknowledgement required
                </div>
              )}
            </div>

            {/* FOOTER */}

            <div className="flex justify-end border-t border-slate-200 p-6">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedCommunication(null);
                }}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          DELETE CONFIRMATION MODAL
      ========================================== */}

      {showDeleteModal && selectedCommunication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl">
              🗑
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Delete Communication?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                "{selectedCommunication.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCommunication(null);
                }}
                disabled={deleteLoading}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleteLoading
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}