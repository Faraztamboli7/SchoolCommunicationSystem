import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Search,
  Check,
  CheckCheck,
  Info,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";

import api from "../services/api";

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  const notificationRef = useRef(null);

  // ==========================================
  // FETCH NOTIFICATIONS
  // ==========================================

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");

      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // ==========================================
  // FETCH UNREAD COUNT
  // ==========================================

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get(
        "/notifications/unread-count"
      );

      if (response.data.success) {
        setUnreadCount(response.data.count);
      }
    } catch (error) {
      console.error(
        "Failed to fetch unread count:",
        error
      );
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();

    // Refresh notification count every 30 seconds
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // MARK ONE AS READ
  // ==========================================

  const markAsRead = async (notificationId) => {
    try {
      await api.put(
        `/notifications/${notificationId}/read`
      );

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: true,
              }
            : notification
        )
      );

      setUnreadCount((previous) =>
        Math.max(previous - 1, 0)
      );

    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  const markAllAsRead = async () => {
    try {
      setLoading(true);

      await api.put("/notifications/read-all");

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );

      setUnreadCount(0);

    } catch (error) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // NOTIFICATION ICON
  // ==========================================

  const getNotificationIcon = (type) => {
    switch (type) {
      case "SUCCESS":
        return (
          <CheckCircle
            size={18}
            className="text-emerald-500"
          />
        );

      case "WARNING":
        return (
          <AlertTriangle
            size={18}
            className="text-amber-500"
          />
        );

      default:
        return (
          <Info
            size={18}
            className="text-blue-500"
          />
        );
    }
  };

  // ==========================================
  // TIME FORMAT
  // ==========================================

  const formatTime = (date) => {
    const notificationDate = new Date(date);
    const now = new Date();

    const difference =
      Math.floor(
        (now - notificationDate) / 1000
      );

    if (difference < 60) {
      return "Just now";
    }

    if (difference < 3600) {
      return `${Math.floor(
        difference / 60
      )} min ago`;
    }

    if (difference < 86400) {
      return `${Math.floor(
        difference / 3600
      )} hr ago`;
    }

    return notificationDate.toLocaleDateString();
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

      {/* ==========================================
          SEARCH
      ========================================== */}

      <div className="relative w-80">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search communications..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
        />

      </div>


      {/* ==========================================
          RIGHT SIDE
      ========================================== */}

      <div className="flex items-center gap-6">

        {/* ========================================
            NOTIFICATION
        ======================================== */}

        <div
          className="relative"
          ref={notificationRef}
        >

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="relative p-2.5 rounded-xl hover:bg-slate-100 transition"
          >

            <Bell
              size={20}
              className={
                unreadCount > 0
                  ? "text-blue-600"
                  : "text-slate-600"
              }
            />

            {/* Unread Badge */}

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}

          </button>


          {/* ======================================
              NOTIFICATION DROPDOWN
          ====================================== */}

          {showNotifications && (
            <div className="absolute right-0 top-14 w-[380px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">

              {/* Header */}

              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-slate-800">
                    Notifications
                  </h3>

                  <p className="text-xs text-slate-500 mt-0.5">
                    {unreadCount === 0
                      ? "You're all caught up"
                      : `${unreadCount} unread notification${
                          unreadCount > 1
                            ? "s"
                            : ""
                        }`}
                  </p>

                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    disabled={loading}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <CheckCheck size={14} />

                    Mark all read
                  </button>
                )}

              </div>


              {/* Notification List */}

              <div className="max-h-[400px] overflow-y-auto">

                {notifications.length === 0 ? (

                  <div className="py-12 px-6 text-center">

                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">

                      <Bell
                        size={24}
                        className="text-slate-400"
                      />

                    </div>

                    <p className="font-medium text-slate-700">
                      No notifications
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      New school communications
                      will appear here.
                    </p>

                  </div>

                ) : (

                  notifications.map(
                    (notification) => (

                      <div
                        key={notification.id}
                        onClick={() =>
                          !notification.is_read &&
                          markAsRead(
                            notification.id
                          )
                        }
                        className={`relative px-5 py-4 border-b border-slate-100 cursor-pointer transition hover:bg-slate-50 ${
                          !notification.is_read
                            ? "bg-blue-50/50"
                            : "bg-white"
                        }`}
                      >

                        <div className="flex gap-3">

                          {/* Icon */}

                          <div className="w-9 h-9 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center">
                            {getNotificationIcon(
                              notification.type
                            )}
                          </div>


                          {/* Content */}

                          <div className="flex-1 min-w-0">

                            <div className="flex items-start justify-between gap-2">

                              <h4 className="text-sm font-semibold text-slate-800">
                                {notification.title}
                              </h4>

                              {!notification.is_read && (
                                <span className="w-2 h-2 shrink-0 rounded-full bg-blue-500 mt-1.5" />
                              )}

                            </div>

                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>

                            <p className="text-xs text-slate-400 mt-2">
                              {formatTime(
                                notification.created_at
                              )}
                            </p>

                          </div>

                        </div>

                      </div>

                    )
                  )

                )}

              </div>


              {/* Footer */}

              {notifications.length > 0 && (
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">

                  <button
                    onClick={() =>
                      setShowNotifications(false)
                    }
                    className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Close
                  </button>

                </div>
              )}

            </div>
          )}

        </div>


        {/* ========================================
            USER PROFILE
        ======================================== */}

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
            A
          </div>

          <div>

            <p className="text-sm font-semibold text-slate-800">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}