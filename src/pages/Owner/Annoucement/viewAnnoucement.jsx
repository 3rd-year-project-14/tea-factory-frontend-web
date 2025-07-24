import {
  AlertCircle,
  CheckCircle,
  Download,
  Paperclip,
  Plus,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT_COLOR = "#165e52";
const BUTTON_COLOR = "#172526";

export default function PureLeafDashboard() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      topic: "General",
      subject: "System Maintenance",
      content:
        "The system will be down for maintenance on Saturday from 2am to 4am.",
      factories: ["Factory A"],
      attachments: [
        { id: 1, name: "report.pdf", size: "2.5 MB" },
        { id: 2, name: "image.jpg", size: "1.2 MB" },
      ],
    },
    {
      id: 2,
      topic: "Urgent",
      subject: "Payment Delay",
      content: "Supplier payments will be delayed due to a bank holiday.",
      factories: ["Factory A", "Factory B"],
      attachments: [],
    },
  ]);

  const [notification, setNotification] = useState(null);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id));
    showNotification("Announcement deleted successfully", "success");
  };

  const handleUpdate = (id) => {
    const announcement = announcements.find((ann) => ann.id === id);
    if (announcement) {
      navigate("/owner/annoucement/update", { state: { announcement } });
    }
  };

  const handleAddNew = () => {
    navigate("/owner/annoucement/add");
  };

  const handleDownloadAttachment = (attachment) => {
    console.log("Download file:", attachment.name);
    showNotification(`Downloading ${attachment.name}...`, "info");
  };

  const NotificationComponent = () => {
    if (!notification) return null;

    const getNotificationStyle = (type) => {
      switch (type) {
        case "success":
          return "bg-green-600 text-white";
        case "error":
          return "bg-red-600 text-white";
        case "info":
          return "bg-blue-600 text-white";
        default:
          return "bg-gray-600 text-white";
      }
    };

    const getNotificationIcon = (type) => {
      switch (type) {
        case "success":
          return <CheckCircle className="w-5 h-5" />;
        case "error":
          return <XCircle className="w-5 h-5" />;
        case "info":
          return <AlertCircle className="w-5 h-5" />;
        default:
          return <AlertCircle className="w-5 h-5" />;
      }
    };

    return (
      <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
        <div
          className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg ${getNotificationStyle(
            notification.type
          )}`}
        >
          {getNotificationIcon(notification.type)}
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 hover:opacity-70 transition-opacity"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fdfc]">
      <NotificationComponent />
      <div className="bg-white shadow-md ">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1
              className="text-3xl font-bold mb-1 text-gray-900"
              // style={{ color: ACCENT_COLOR }}
            >
              Announcements
            </h1>
            <p className="text-[#000000] opacity-80 max-w-2xl">
              Owner Dashboard - Announcement Center
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium shadow transition-colors"
            style={{ backgroundColor: BUTTON_COLOR, color: "white" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = ACCENT_COLOR)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = BUTTON_COLOR)
            }
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white p-6 rounded-lg shadow-md border border-black transition duration-200 hover:shadow-lg hover:border-[#cfece6] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#165e52] bg-[#f0f9f8] text-[#165e52] font-semibold text-base shadow-sm"
                    style={{
                      minWidth: "90px",
                      textAlign: "center",
                      letterSpacing: "0.01em",
                      fontFamily: "inherit",
                      lineHeight: "1.5",
                      marginRight: "0.5rem",
                      boxShadow: "0 1px 4px 0 rgba(59,130,246,0.10)",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#165e52] inline-block"></span>
                    {announcement.topic}
                  </span>
                  <span className="text-xs text-gray-500 italic">
                    # {announcement.factories.join(", ")}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="block text-lg font-semibold text-black">
                    {announcement.subject || (
                      <span className="text-gray-400">-</span>
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="block text-gray-800 text-base">
                    {announcement.content || (
                      <span className="text-gray-400">-</span>
                    )}
                  </span>
                </div>
                {announcement.attachments &&
                  announcement.attachments.length > 0 && (
                    <div className="mb-4">
                      <div className="font-medium text-gray-800 mb-1">
                        Attachments
                      </div>
                      <div className="space-y-2">
                        {announcement.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between p-3 border border-gray-300 rounded bg-gray-50"
                          >
                            <div className="flex items-center space-x-3">
                              <Paperclip className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-800">
                                {attachment.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({attachment.size})
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleDownloadAttachment(attachment)
                              }
                              className="p-1 text-green-700 hover:text-green-900 transition-colors"
                              aria-label={`Download ${attachment.name}`}
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              <div className="flex space-x-3 justify-end mt-4">
                <button
                  onClick={() => handleUpdate(announcement.id)}
                  className="px-6 py-2 rounded font-medium transition-colors text-white"
                  style={{ backgroundColor: BUTTON_COLOR }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = ACCENT_COLOR)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = BUTTON_COLOR)
                  }
                >
                  UPDATE
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="px-6 py-2 rounded font-medium transition-colors text-white"
                  style={{ backgroundColor: "#dc2626" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#b91c1c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dc2626")
                  }
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
