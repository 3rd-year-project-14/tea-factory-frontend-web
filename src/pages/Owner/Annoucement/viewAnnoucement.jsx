import { AlertCircle, CheckCircle, Download, Paperclip, Plus, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PureLeafDashboard() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      topic: "General",
      subject: "",
      content: "",
      factories: ["Factory A"],
      attachments: [
        { id: 1, name: "report.pdf", size: "2.5 MB" },
        { id: 2, name: "image.jpg", size: "1.2 MB" }
      ]
    },
    {
      id: 2,
      topic: "Urgent",
      subject: "",
      content: "",
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
      setUpdateAnnouncement({
        topic: announcement.topic || "",
        subject: announcement.subject,
        content: announcement.content,
        factories: [...announcement.factories],
        attachments: [...announcement.attachments]
      });
      setUpdateAnnouncementId(id);
      setShowUpdateForm(true);
    }
  };

  const handleAddNew = () => {
    setShowAddForm(true);
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
    <div className="min-h-screen bg-gray-200">
      <NotificationComponent />
      {/* Main Content */}
      <div className="p-6">
        {!showAddForm && !showUpdateForm ? (
          <>
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-normal text-gray-800">Announcements</h2>
                <button
                  onClick={handleAddNew}
                  className="flex items-center space-x-2 bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New</span>
                </button>
              </div>
            </div>

            {/* Announcements */}
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="mb-4">
                        <label className="block text-lg font-normal text-gray-800 mb-2">Announcement ID: {announcement.id}</label>
                        <div className="min-h-[20px]"></div>
                      </div>
                      <hr className="border-gray-300 mb-4" />
                      <div className="mb-4">
                        <label className="block text-lg font-normal text-gray-800 mb-2">Topic</label>
                        <div className="min-h-[40px] flex items-center">
                          {announcement.topic ? (
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
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </div>
                      <hr className="border-gray-300 mb-4" />
                      <div className="mb-4">
                        <label className="block text-lg font-normal text-gray-800 mb-2">Subject</label>
                        <div className="min-h-[40px] p-3 border border-gray-200 rounded bg-gray-50">{announcement.subject || <span className='text-gray-400'>-</span>}</div>
                      </div>
                      <hr className="border-gray-300 mb-4" />
                      
                      <div className="mb-4">
                        <label className="block text-lg font-normal text-gray-800 mb-2">Content</label>
                        <div className="min-h-[60px] p-3 border border-gray-200 rounded bg-gray-50"></div>
                      </div>
                      
                      {/* Show attachments if any */}
                      {announcement.attachments && announcement.attachments.length > 0 && (
                        <>
                          <hr className="border-gray-300 mb-4" />
                          <div className="mb-4">
                            <label className="block text-lg font-normal text-gray-800 mb-2">Attachments</label>
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
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 italic ml-6 mt-2">
                      # {announcement.factories.join(', ')}
                    </div>
                  </div>

                  {/* Horizontal line before buttons */}
                  <hr className="border-gray-300 mb-4" />

                  <div className="flex space-x-3 justify-end">
                    <button
                      onClick={() => handleUpdate(announcement.id)}
                      className="px-8 py-2 bg-green-400 hover:bg-green-500 text-white rounded font-medium transition-colors"
                    >
                      UPDATE
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="px-8 py-2 bg-red-400 hover:bg-red-500 text-white rounded font-medium transition-colors"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : showAddForm ? (
          /* Add New Announcement Form */
          <>
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-normal text-gray-800">Add New Announcement</h2>
                <button
                  onClick={handleCancelAdd}
                  className="text-gray-500 hover:text-gray-700 text-lg font-medium"
                >
                  ← Back to Announcements
                </button>
              </div>
            </div>

            {/* Add Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">Topic</label>
                  <input
                    type="text"
                    value={newAnnouncement.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Enter announcement topic"
                  />
                </div>

                <hr className="border-gray-300" />
                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newAnnouncement.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Enter announcement subject"
                  />
                </div>

                <hr className="border-gray-300" />

                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">Content</label>
                  <textarea
                    value={newAnnouncement.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
                    placeholder="Enter announcement content"
                  />
                </div>

                <hr className="border-gray-300" />

                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">
                    Factories ({newAnnouncement.factories.length} selected)
                  </label>
                  <div className="space-y-2 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    {factoryOptions.map((factory) => (
                      <label key={factory} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAnnouncement.factories.includes(factory)}
                          onChange={() => handleFactoryToggle(factory)}
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                        />
                        <span className="text-gray-700">{factory}</span>
                      </label>
                    ))}
                  </div>
                  {newAnnouncement.factories.length === 0 && (
                    <p className="text-sm text-red-500 mt-1">Please select at least one factory</p>
                  )}
                </div>

                <hr className="border-gray-300" />

                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">Attach Files</label>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="fileUpload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.xls"
                      />
                      <label
                        htmlFor="fileUpload"
                        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span>Choose Files</span>
                      </label>
                      <span className="ml-3 text-sm text-gray-500">
                        Supported: PDF, DOC, DOCX, JPG, PNG, TXT, XLSX
                      </span>
                    </div>

                    {/* Display selected files */}
                    {newAnnouncement.attachments.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                        {newAnnouncement.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <Paperclip className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{attachment.name}</span>
                              <span className="text-xs text-gray-500">({attachment.size})</span>
                            </div>
                            <button
                              onClick={() => handleRemoveAttachment(attachment.id)}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <hr className="border-gray-300" />

                <div className="flex space-x-3 justify-end">
                  <button
                    onClick={handleCancelAdd}
                    className="px-8 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded font-medium transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleSaveAnnouncement}
                    className="px-8 py-2 bg-green-400 hover:bg-green-500 text-white rounded font-medium transition-colors"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Update Announcement Form */
          <>
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-normal text-gray-800">Update Announcement</h2>
                <button
                  onClick={handleCancelUpdate}
                  className="text-gray-500 hover:text-gray-700 text-lg font-medium"
                >
                  ← Back to Announcements
                </button>
              </div>
            </div>

            {/* Update Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">Topic</label>
                  <input
                    type="text"
                    value={updateAnnouncement.topic}
                    onChange={(e) => handleUpdateInputChange('topic', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Enter announcement topic"
                  />
                </div>

                <hr className="border-gray-300" />
                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">Subject</label>
                  <input
                    type="text"
                    value={updateAnnouncement.subject}
                    onChange={(e) => handleUpdateInputChange('subject', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Enter announcement subject"
                  />
                </div>

                <hr className="border-gray-300" />

                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">Content</label>
                  <textarea
                    value={updateAnnouncement.content}
                    onChange={(e) => handleUpdateInputChange('content', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
                    placeholder="Enter announcement content"
                  />
                </div>

                <hr className="border-gray-300" />

                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">
                    Factories ({updateAnnouncement.factories.length} selected)
                  </label>
                  <div className="space-y-2 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    {factoryOptions.map((factory) => (
                      <label key={factory} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={updateAnnouncement.factories.includes(factory)}
                          onChange={() => handleUpdateFactoryToggle(factory)}
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                        />
                        <span className="text-gray-700">{factory}</span>
                      </label>
                    ))}
                  </div>
                  {updateAnnouncement.factories.length === 0 && (
                    <p className="text-sm text-red-500 mt-1">Please select at least one factory</p>
                  )}
                </div>

                <hr className="border-gray-300" />

                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-2">Attach Files</label>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleUpdateFileUpload}
                        className="hidden"
                        id="updateFileUpload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.xls"
                      />
                      <label
                        htmlFor="updateFileUpload"
                        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span>Choose Files</span>
                      </label>
                      <span className="ml-3 text-sm text-gray-500">
                        Supported: PDF, DOC, DOCX, JPG, PNG, TXT, XLSX
                      </span>
                    </div>

                    {/* Display selected files */}
                    {updateAnnouncement.attachments.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Attached Files:</p>
                        {updateAnnouncement.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <Paperclip className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{attachment.name}</span>
                              <span className="text-xs text-gray-500">({attachment.size})</span>
                            </div>
                            <button
                              onClick={() => handleUpdateRemoveAttachment(attachment.id)}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <hr className="border-gray-300" />

                <div className="flex space-x-3 justify-end">
                  <button
                    onClick={handleCancelUpdate}
                    className="px-8 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded font-medium transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleSaveUpdate}
                    className="px-8 py-2 bg-green-400 hover:bg-green-500 text-white rounded font-medium transition-colors"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}