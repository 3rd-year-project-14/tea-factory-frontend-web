import { Paperclip, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";
const INPUT_BG = "#ffffff";

export default function AddAnnouncement() {
  const [form, setForm] = useState({
    topic: "",
    subject: "",
    content: "",
    factories: [],
    attachments: [],
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const factoryOptions = ["Factory A", "Factory B", "Factory C", "Factory D"];
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFactoryToggle = (factory) => {
    setForm((prev) => {
      const isSelected = prev.factories.includes(factory);
      const newFactories = isSelected
        ? prev.factories.filter((f) => f !== factory)
        : [...prev.factories, factory];
      return {
        ...prev,
        factories: newFactories,
      };
    });
    setDropdownOpen(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      file: file,
    }));
    setForm((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  };

  const handleRemoveAttachment = (attachmentId) => {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== attachmentId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div
        className="bg-white shadow-sm border-b"
        // style={{ borderColor: BORDER_COLOR }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1
                className="text-3xl font-bold text-gray-900"
                // style={{ color: ACCENT_COLOR }}
              >
                Add Announcement
              </h1>
              <p className="text-gray-600 mt-1">
                Owner Dashboard - Add a New Announcement
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="flex items-center text-gray-500 hover:text-gray-700 text-lg font-medium px-4 py-2 rounded-lg border border-gray-300 bg-white transition-colors"
                style={{ borderColor: BORDER_COLOR }}
              >
                <span className="mr-2">&#8592;</span> Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg font-medium shadow transition-colors"
                style={{ backgroundColor: BTN_COLOR, color: "white" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = ACCENT_COLOR)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = BTN_COLOR)
                }
              >
                Save Announcement
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
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: ACCENT_COLOR }}
                  >
                    Announcement Details
                  </h3>
                </div>

                {/* Topic Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Topic :
                  </label>
                  <input
                    type="text"
                    value={form.topic}
                    onChange={(e) => handleInputChange("topic", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#165e52] focus:border-[#165e52] transition-all bg-white"
                    placeholder="Enter announcement topic"
                    style={{ borderColor: BORDER_COLOR }}
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject :
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#165e52] focus:border-[#165e52] transition-all bg-white"
                    placeholder="Enter announcement subject"
                    style={{ borderColor: BORDER_COLOR }}
                  />
                </div>

                {/* Content Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Content :
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    rows={5}
                    className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#165e52] focus:border-[#165e52] transition-all resize-none bg-white"
                    placeholder="Enter announcement content"
                    style={{ borderColor: BORDER_COLOR }}
                  />
                </div>
              </div>

              {/* Right Column - Factories & Attachments */}
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: ACCENT_COLOR }}
                  >
                    Assignment & Attachments
                  </h3>
                </div>

                {/* Factories Multi-Select Styled Dropdown */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Factories :
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full px-4 py-3 border rounded-lg text-left text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#165e52] focus:border-[#165e52] transition-all cursor-pointer bg-white"
                      style={{ borderColor: BORDER_COLOR }}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                    >
                      {form.factories.length > 0
                        ? form.factories.join(", ")
                        : "Select factories"}
                    </button>
                    {dropdownOpen && (
                      <ul
                        className="absolute top-full left-0 right-0 mt-1 max-h-64 overflow-auto rounded-lg border border-[#165e52] bg-white shadow-lg z-50"
                        role="listbox"
                        tabIndex={-1}
                      >
                        {factoryOptions.map((factory) => (
                          <li
                            key={factory}
                            role="option"
                            aria-selected={form.factories.includes(factory)}
                            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#e1f4ef] ${
                              form.factories.includes(factory)
                                ? "bg-[#d4eadf] font-semibold"
                                : ""
                            }`}
                            onClick={() => handleFactoryToggle(factory)}
                          >
                            <input
                              type="checkbox"
                              checked={form.factories.includes(factory)}
                              readOnly
                              className="w-4 h-4 mr-2 cursor-pointer text-[#165e52] bg-white border border-gray-300 rounded focus:ring-[#165e52] focus:ring-2"
                            />
                            {factory}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {form.factories.length} selected
                  </div>
                </div>

                {/* Attach Files */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Attach Files
                  </label>
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
                        className="flex items-center space-x-2 bg-[#165e52] hover:bg-[#01251f] text-white px-4 py-2 rounded-lg cursor-pointer select-none transition-colors"
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
                        <p className="text-sm font-medium text-gray-700">
                          Selected Files:
                        </p>
                        {form.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                          >
                            <div className="flex items-center space-x-3">
                              <Paperclip className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">
                                {attachment.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({attachment.size})
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveAttachment(attachment.id)
                              }
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                              aria-label={`Remove ${attachment.name}`}
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
