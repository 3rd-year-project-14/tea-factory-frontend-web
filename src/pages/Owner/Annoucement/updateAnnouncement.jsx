import { Paperclip, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UpdateAnnouncement() {
  const navigate = useNavigate();
  const location = useLocation();
  const announcement = location.state?.announcement || {
    topic: '',
    subject: '',
    content: '',
    factories: [],
    attachments: []
  };
  const [form, setForm] = useState({ ...announcement });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const factoryOptions = ['Factory A', 'Factory B', 'Factory C', 'Factory D'];

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFactoryToggle = (factory) => {
    setForm(prev => {
      const isSelected = prev.factories.includes(factory);
      const newFactories = isSelected
        ? prev.factories.filter(f => f !== factory)
        : [...prev.factories, factory];
      return {
        ...prev,
        factories: newFactories
      };
    });
    setDropdownOpen(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      file: file
    }));
    setForm(prev => ({ ...prev, attachments: [...prev.attachments, ...newAttachments] }));
  };

  const handleRemoveAttachment = (attachmentId) => {
    setForm(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically update the announcement in your backend or state management
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Update Announcement</h1>
              <p className="text-gray-600 mt-1">Owner Dashboard - Update Announcement</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="flex items-center text-gray-500 hover:text-gray-700 text-lg font-medium px-4 py-2 rounded-lg border border-gray-300 bg-white transition-colors"
              >
                <span className="mr-2">&#8592;</span> Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow"
              >
                Update Announcement
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Main Fields */}
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">Announcement Details</h3>
                </div>
                {/* Topic Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Topic :</label>
                  <input
                    type="text"
                    value={form.topic}
                    onChange={e => handleInputChange('topic', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter announcement topic"
                  />
                </div>
                {/* Subject Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject :</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter announcement subject"
                  />
                </div>
                {/* Content Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Content :</label>
                  <textarea
                    value={form.content}
                    onChange={e => handleInputChange('content', e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-gray-900 placeholder-gray-400 resize-none"
                    placeholder="Enter announcement content"
                  />
                </div>
              </div>

              {/* Right Column - Factories & Attachments */}
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">Assignment & Attachments</h3>
                </div>
                {/* Factories Multi-Select Styled Dropdown */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Factories :</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
                    >
                      {form.factories.length > 0
                        ? form.factories.join(', ')
                        : 'Select factories'}
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-400 rounded-lg shadow-2xl z-50">
                        {factoryOptions.map(factory => (
                          <label key={factory} className="flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={form.factories.includes(factory)}
                              onChange={e => {
                                e.stopPropagation();
                                handleFactoryToggle(factory);
                              }}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mr-2"
                            />
                            <span className="text-gray-700">{factory}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{form.factories.length} selected</div>
                </div>
                {/* Attach Files */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Attach Files</label>
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
                    {form.attachments.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                        {form.attachments.map(attachment => (
                          <div key={attachment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <Paperclip className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{attachment.name}</span>
                              <span className="text-xs text-gray-500">({attachment.size})</span>
                            </div>
                            <button
                              type="button"
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
