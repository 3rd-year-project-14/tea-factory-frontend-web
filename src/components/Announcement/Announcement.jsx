import {
    Download,
    Paperclip,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewAnnouncements } from "../../api/owner";
import { useAuth } from "../../contexts/AuthContext";

const BUTTON_COLOR = "#172526";

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
      <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded text-white ${style}`}>
        {notification.message}
      </div>
    );
  };

  return (
    <div className="min-h-screen overflow-auto bg-[#f8fdfc]">
      <Notification />

      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-gray-900">Announcements</h1>
            <p className="text-[#000000] opacity-80 max-w-2xl">Owner Dashboard - Announcement Center</p>
          </div>
          {/* Add New removed */}
        </div>
      </div>

      {/* Content */}
  <div className="max-w-7xl mx-auto px-6 py-8">
  <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {visibleAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-white p-6 rounded-lg shadow-md border transition hover:shadow-lg">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#165e52] bg-[#f0f9f8] text-[#165e52] font-semibold text-base shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#165e52] inline-block" />
                      {announcement.topic}
                    </span>
                    <span className="text-xs text-gray-500 italic"># {formatFactories(announcement.factories)}</span>
                  </div>

                  <div className="mb-2">
                    <span className="block text-lg font-semibold text-black">{announcement.subject || <span className="text-gray-400">-</span>}</span>
                  </div>

                  <div className="mb-4">
                    <span className="block text-gray-800 text-base">{announcement.content || <span className="text-gray-400">-</span>}</span>
                  </div>

                  {announcement.attachments && announcement.attachments.length > 0 && (
                    <div className="mb-4">
                      <div className="font-medium text-gray-800 mb-1">Attachments</div>
                      <div className="space-y-2">
                        {announcement.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center justify-between p-3 border border-gray-300 rounded bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <Paperclip className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-800">{attachment.name}</span>
                              <span className="text-xs text-gray-500">({attachment.size})</span>
                            </div>
                            <button onClick={() => console.log("download", attachment)} className="p-1 text-green-700 hover:text-green-900"><Download className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* view-only: actions removed */}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

