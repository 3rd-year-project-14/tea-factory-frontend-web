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
import { deleteAnnouncement, viewAnnouncements } from "../../../api/owner";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function PureLeafDashboard() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const factoryOptions = [
    { id: 1, name: "Wawlugala Tea Factory" },
    { id: 2, name: "Miyanawathura Tea Factory" },
    { id: 3, name: "Andaradeniya Tea Factory" },
    { id: 4, name: "Batuwangala Tea Factory" },
    { id: 5, name: "Duli Ella Tea Factory" },
    { id: 6, name: "Devonia Tea Factory" },
    { id: 7, name: "Fortune Tea Factory" },
    { id: 8, name: "Galaxi Tea Factory" },
    { id: 9, name: "Ruhunu Tea Factory" },
  ];

  const topicOptions = [
    { id: "general", name: "General" },
    { id: "payments", name: "Payments" },
    { id: "maintenance", name: "Maintenance" },
    { id: "routes", name: "Routes" },
    { id: "inventory", name: "Inventory" },
    { id: "fertilizer", name: "Fertilizer" },
    { id: "event", name: "Event" },
  ];

  const formatTopic = (topic) => {
    if (!topic) return "-";
    const found = topicOptions.find((t) => String(t.id) === String(topic));
    return found ? found.name : String(topic);
  };

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchAnnouncements() {
      try {
        const data = await viewAnnouncements();
        if (mounted) setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error?.response || error?.message || error);
      }
    }
    fetchAnnouncements();
    return () => {
      mounted = false;
    };
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
      showNotification("Announcement deleted successfully", "success");
    } catch (error) {
      showNotification("Failed to delete announcement", "error");
      console.error("Error deleting announcement:", error?.response || error?.message || error);
    }
  };

  const handleUpdate = async (id) => {
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
          className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-card ${getNotificationStyle(
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
    <div className="min-h-full">
      <NotificationComponent />
      <Card className="mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
              Announcements
            </h1>
            <p className="text-ink/60 dark:text-muted-dark mt-1 text-sm">
              Owner Dashboard - Announcement Center
            </p>
          </div>
          <Button variant="primary" icon={Plus} onClick={handleAddNew}>
            Add New
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id} hoverable className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-tea-600 dark:border-tea-500 bg-tea-50 dark:bg-tea-900/20 text-tea-700 dark:text-tea-300 font-semibold text-sm">
                  <span className="w-2 h-2 rounded-full bg-tea-600 dark:bg-tea-300 inline-block"></span>
                  {formatTopic(announcement.topic)}
                </span>
                <span className="text-xs text-ink/50 dark:text-muted-dark italic">
                  # {announcement.factories
                      .map(fid => {
                        const found = factoryOptions.find(f => f.id === fid || f.id === Number(fid));
                        return found ? found.name : fid;
                      })
                      .join(", ")}
                </span>
              </div>
              <div className="mb-2">
                <span className="block text-lg font-heading font-semibold text-ink dark:text-ink-dark">
                  {announcement.subject || (
                    <span className="text-ink/40 dark:text-muted-dark">-</span>
                  )}
                </span>
              </div>
              <div className="mb-4">
                <span className="block text-ink/80 dark:text-ink-dark/80 text-sm">
                  {announcement.content || (
                    <span className="text-ink/40 dark:text-muted-dark">-</span>
                  )}
                </span>
              </div>
              {announcement.attachments &&
                announcement.attachments.length > 0 && (
                  <div className="mb-4">
                    <div className="font-medium text-ink dark:text-ink-dark mb-1 text-sm">
                      Attachments
                    </div>
                    <div className="space-y-2">
                      {announcement.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-surface dark:bg-white/5 border border-tea-100 dark:border-card-border-dark"
                        >
                          <div className="flex items-center space-x-3">
                            <Paperclip className="w-4 h-4 text-ink/60 dark:text-muted-dark" />
                            <span className="text-sm text-ink dark:text-ink-dark">
                              {attachment.name}
                            </span>
                            <span className="text-xs text-ink/50 dark:text-muted-dark">
                              ({attachment.size})
                            </span>
                          </div>
                          <button
                            onClick={() => handleDownloadAttachment(attachment)}
                            className="p-1 text-tea-700 dark:text-tea-300 hover:text-tea-800 dark:hover:text-tea-200 transition-colors"
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
              <Button variant="primary" size="sm" onClick={() => handleUpdate(announcement.id)}>
                UPDATE
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(announcement.id)}>
                DELETE
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
