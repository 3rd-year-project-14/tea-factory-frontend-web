import {
    Download,
    Megaphone,
    Paperclip,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewAnnouncements } from "../../api/owner";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

export default function AnnouncementComponent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [notification, setNotification] = useState(null);

  // local mapping of factory ids to names (same as viewAnnoucement.jsx)
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

  const formatFactories = (facs) => {
    if (!facs) return "-";
    if (!Array.isArray(facs)) return String(facs);
    return facs
      .map((fid) => {
        // handle case where fid may be an object { id, name }
        if (fid && typeof fid === "object") {
          return fid.name || fid.id || JSON.stringify(fid);
        }
        const found = factoryOptions.find((f) => String(f.id) === String(fid) || f.id === fid);
        return found ? found.name : fid;
      })
      .join(", ");
  };

  // fetch announcements
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
    return () => (mounted = false);
  }, []);


  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // View-only: update and delete actions removed

  // Add new action removed per UI update

  // compute visible announcements based on user's factory
  const visibleAnnouncements = (() => {
    const factoryId = user?.factoryId;
    const factoryName = user?.factoryName;
    if (!factoryId && !factoryName) return announcements || [];
    return (announcements || []).filter((announcement) => {
      const facs = announcement.factories;
      if (!facs) return false;
      if (Array.isArray(facs)) {
        return facs.some((f) => {
          if (f == null) return false;
          if (typeof f === "object") {
            return String(f.id) === String(factoryId) || String(f.name) === String(factoryName);
          }
          return String(f) === String(factoryId) || String(f) === String(factoryName);
        });
      }
      const s = String(facs);
      return (factoryId && s.includes(String(factoryId))) || (factoryName && s.includes(String(factoryName)));
    });
  })();

  const Notification = () => {
    if (!notification) return null;
    const style = notification.type === "success" ? "bg-green-600" : "bg-red-600";
    return (
      <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-white shadow-card ${style}`}>
        {notification.message}
      </div>
    );
  };

  return (
    <div className="min-h-full">
      <Notification />

      {/* Header */}
      <Card className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 mb-1">
          Announcements
        </h1>
        <p className="text-ink/60 dark:text-muted-dark text-sm">
          Stay updated with factory-wide notices
        </p>
      </Card>

      {/* Content */}
      {visibleAnnouncements.length === 0 ? (
        <Card className="!p-0 overflow-hidden">
          <EmptyState
            icon={Megaphone}
            title="No announcements yet"
            description="Announcements relevant to your factory will show up here."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {visibleAnnouncements.map((announcement) => (
            <Card key={announcement.id} hoverable>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-tea-600 bg-tea-50 dark:bg-tea-900/30 dark:border-tea-500 text-tea-700 dark:text-tea-200 font-semibold text-sm">
                  <span className="w-2 h-2 rounded-full bg-tea-600 dark:bg-tea-300 inline-block" />
                  {announcement.topic}
                </span>
                <span className="text-xs text-ink/50 dark:text-muted-dark italic">
                  # {formatFactories(announcement.factories)}
                </span>
              </div>

              <div className="mb-2">
                <span className="block text-lg font-heading font-semibold text-ink dark:text-ink-dark">
                  {announcement.subject || <span className="text-ink/40 dark:text-muted-dark">-</span>}
                </span>
              </div>

              <div className="mb-4">
                <span className="block text-ink/80 dark:text-ink-dark/80 text-sm">
                  {announcement.content || <span className="text-ink/40 dark:text-muted-dark">-</span>}
                </span>
              </div>

              {announcement.attachments && announcement.attachments.length > 0 && (
                <div className="mb-1">
                  <div className="font-medium text-ink dark:text-ink-dark mb-1 text-sm">Attachments</div>
                  <div className="space-y-2">
                    {announcement.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-surface dark:bg-white/5 border border-tea-100 dark:border-card-border-dark"
                      >
                        <div className="flex items-center space-x-3">
                          <Paperclip className="w-4 h-4 text-ink/60 dark:text-muted-dark" />
                          <span className="text-sm text-ink dark:text-ink-dark">{attachment.name}</span>
                          <span className="text-xs text-ink/50 dark:text-muted-dark">({attachment.size})</span>
                        </div>
                        <button
                          onClick={() => console.log("download", attachment)}
                          className="p-1 text-tea-700 dark:text-tea-300 hover:text-tea-800 dark:hover:text-tea-200 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
