import { AlertCircle, CheckCircle, Download, Paperclip, Plus, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PureLeafDashboard() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      topic: "General",
      subject: "System Maintenance",
      content: "The system will be down for maintenance on Saturday from 2am to 4am.",
      factories: ["Factory A"],
      attachments: [
        { id: 1, name: "report.pdf", size: "2.5 MB" },
        { id: 2, name: "image.jpg", size: "1.2 MB" }
      ]
    },
    {
      id: 2,
      topic: "Urgent",
      subject: "Payment Delay",
      content: "Supplier payments will be delayed due to a bank holiday.",
      factories: ["Factory A", "Factory B"],
      attachments: []
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateAnnouncementId, setUpdateAnnouncementId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    topic: "",
    subject: "",
    content: "",
    factories: [],
    attachments: []
  });
  const [updateAnnouncement, setUpdateAnnouncement] = useState({
    topic: "",
    subject: "",
    content: "",
    factories: [],
    attachments: []
  });

  const factoryOptions = ["Factory A", "Factory B", "Factory C", "Factory D"];

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
    showNotification('Announcement deleted successfully', 'success');
  };

  const handleUpdate = (id) => {
    const announcement = announcements.find(ann => ann.id === id);
    if (announcement) {
      navigate('/owner/annoucement/update', { state: { announcement } });
    }
  };

  const handleAddNew = () => {
    navigate('/owner/annoucement/add');
  };

  const handleSaveAnnouncement = () => {
    if (!newAnnouncement.subject.trim() && !newAnnouncement.content.trim()) {
      showNotification('Please enter subject or content', 'error');
      return;
    }
    if (newAnnouncement.factories.length === 0) {
      showNotification('Please select at least one factory', 'error');
      return;
    }
    const announcement = {
      id: Date.now(),
      topic: newAnnouncement.topic,
      subject: newAnnouncement.subject,
      content: newAnnouncement.content,
      factories: newAnnouncement.factories,
      attachments: newAnnouncement.attachments
    };
    setAnnouncements([...announcements, announcement]);
    setNewAnnouncement({ topic: "", subject: "", content: "", factories: [], attachments: [] });
    setShowAddForm(false);
    showNotification('Announcement created successfully', 'success');
  };

  const handleSaveUpdate = () => {
    if (!updateAnnouncement.subject.trim() && !updateAnnouncement.content.trim()) {
      showNotification('Please enter subject or content', 'error');
      return;
    }
    if (updateAnnouncement.factories.length === 0) {
      showNotification('Please select at least one factory', 'error');
      return;
    }
    const updatedAnnouncements = announcements.map(ann => 
      ann.id === updateAnnouncementId 
        ? {
            ...ann,
            topic: updateAnnouncement.topic,
            subject: updateAnnouncement.subject,
            content: updateAnnouncement.content,
            factories: updateAnnouncement.factories,
            attachments: updateAnnouncement.attachments
          }
        : ann
    );
    setAnnouncements(updatedAnnouncements);
    setUpdateAnnouncement({ topic: "", subject: "", content: "", factories: [], attachments: [] });
    setUpdateAnnouncementId(null);
    setShowUpdateForm(false);
    showNotification('Announcement updated successfully', 'success');
  };

  const handleCancelAdd = () => {
    setNewAnnouncement({ subject: "", content: "", factories: [], attachments: [] });
    setShowAddForm(false);
    showNotification('Action cancelled', 'info');
  };

  const handleCancelUpdate = () => {
    setUpdateAnnouncement({ subject: "", content: "", factories: [], attachments: [] });
    setUpdateAnnouncementId(null);
    setShowUpdateForm(false);
    showNotification('Update cancelled', 'info');
  };

  const handleInputChange = (field, value) => {
    setNewAnnouncement(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateInputChange = (field, value) => {
    setUpdateAnnouncement(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFactoryToggle = (factory) => {
    setNewAnnouncement(prev => ({
      ...prev,
      factories: prev.factories.includes(factory)
        ? prev.factories.filter(f => f !== factory)
        : [...prev.factories, factory]
    }));
  };

  const handleUpdateFactoryToggle = (factory) => {
    setUpdateAnnouncement(prev => ({
      ...prev,
      factories: prev.factories.includes(factory)
        ? prev.factories.filter(f => f !== factory)
        : [...prev.factories, factory]
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      file: file
    }));
    
    setNewAnnouncement(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
    
    showNotification(`${files.length} file(s) attached successfully`, 'success');
  };

  const handleUpdateFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      file: file
    }));
    
    setUpdateAnnouncement(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
    
    showNotification(`${files.length} file(s) attached successfully`, 'success');
  };

  const handleRemoveAttachment = (attachmentId) => {
    setNewAnnouncement(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
    showNotification('File removed', 'info');
  };

  const handleUpdateRemoveAttachment = (attachmentId) => {
    setUpdateAnnouncement(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
    showNotification('File removed', 'info');
  };

  const handleDownloadAttachment = (attachment) => {
    // This would typically download the file
    console.log('Download file:', attachment.name);
    showNotification(`Downloading ${attachment.name}...`, 'info');
  };

  const NotificationComponent = () => {
    if (!notification) return null;

    const getNotificationStyle = (type) => {
      switch (type) {
        case 'success':
          return 'bg-green-500 text-white';
        case 'error':
          return 'bg-red-500 text-white';
        case 'info':
          return 'bg-blue-500 text-white';
        default:
          return 'bg-gray-500 text-white';
      }
    };

    const getNotificationIcon = (type) => {
      switch (type) {
        case 'success':
          return <CheckCircle className="w-5 h-5" />;
        case 'error':
          return <XCircle className="w-5 h-5" />;
        case 'info':
          return <AlertCircle className="w-5 h-5" />;
        default:
          return <AlertCircle className="w-5 h-5" />;
      }
    };

    return (
      <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
        <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg ${getNotificationStyle(notification.type)}`}>
          {getNotificationIcon(notification.type)}
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NotificationComponent />
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
              <p className="text-gray-600 mt-1">Owner Dashboard - Announcement Center</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddNew}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-md border-l-4 border-blue-500 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-blue-500 bg-blue-50 text-blue-700 font-semibold text-base shadow-sm"
                    style={{
                      minWidth: '90px',
                      textAlign: 'center',
                      letterSpacing: '0.01em',
                      fontFamily: 'inherit',
                      lineHeight: '1.5',
                      marginRight: '0.5rem',
                      boxShadow: '0 1px 4px 0 rgba(59,130,246,0.10)'
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                    {announcement.topic}
                  </span>
                  <span className="text-xs text-gray-500 italic"># {announcement.factories.join(', ')}</span>
                </div>
                <div className="mb-2">
                  <span className="block text-lg font-semibold text-gray-800">{announcement.subject || <span className='text-gray-400'>-</span>}</span>
                </div>
                <div className="mb-4">
                  <span className="block text-gray-700 text-base">{announcement.content || <span className='text-gray-400'>-</span>}</span>
                </div>
                {announcement.attachments && announcement.attachments.length > 0 && (
                  <div className="mb-4">
                    <div className="font-medium text-gray-700 mb-1">Attachments</div>
                    <div className="space-y-2">
                      {announcement.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <Paperclip className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{attachment.name}</span>
                            <span className="text-xs text-gray-500">({attachment.size})</span>
                          </div>
                          <button
                            onClick={() => handleDownloadAttachment(attachment)}
                            className="p-1 text-green-600 hover:text-green-800 transition-colors"
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
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors"
                >
                  UPDATE
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="px-6 py-2 bg-red-400 hover:bg-red-500 text-white rounded font-medium transition-colors"
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