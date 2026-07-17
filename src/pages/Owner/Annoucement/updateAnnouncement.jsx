import { Paperclip, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateAnnouncement } from "../../../api/owner";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40 transition-all";

export default function UpdateAnnouncement() {
  const navigate = useNavigate();
  const location = useLocation();
  const announcement = location.state?.announcement || {
    topic: "",
    subject: "",
    content: "",
    factories: [],
    attachments: [],
  };
  const [form, setForm] = useState({
    ...announcement,
    factories: Array.isArray(announcement.factories)
      ? announcement.factories.map(f => typeof f === "object" && f.id ? f.id : String(f))
      : [],
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const factoryOptions = [
    { id: "1", name: "Wawlugala Tea Factory" },
    { id: "2", name: "Miyanawathura Tea Factory" },
    { id: "3", name: "Andaradeniya Tea Factory" },
    { id: "4", name: "Batuwangala Tea Factory" },
    { id: "5", name: "Duli Ella Tea Factory" },
    { id: "6", name: "Devonia Tea Factory" },
    { id: "7", name: "Fortune Tea Factory" },
    { id: "8", name: "Galaxi Tea Factory" },
    { id: "9", name: "Ruhunu Tea Factory" },
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

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFactoryToggle = (factoryId) => {
    setForm((prev) => {
      const isSelected = prev.factories.includes(factoryId);
      const newFactories = isSelected
        ? prev.factories.filter((f) => f !== factoryId)
        : [...prev.factories, factoryId];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("topic", form.topic);
    formData.append("subject", form.subject);
    formData.append("content", form.content);
    form.factories.forEach(f => formData.append("factories", f));
    form.attachments.forEach(att => {
      if (att.file) formData.append("attachments", att.file);
    });
    try {
      const result = await updateAnnouncement(announcement.id, formData);
      console.log("Update response:", result);
      navigate(-1);
    } catch (error) {
      console.error("Error updating announcement:", error?.response || error?.message || error);
    }
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
              Update Announcement
            </h1>
            <p className="text-ink/60 dark:text-muted-dark mt-1 text-sm">
              Owner Dashboard - Update Announcement
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)} type="button">
              <span className="mr-2">&#8592;</span> Back
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Update Announcement
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Main Fields */}
            <div className="space-y-6">
              <div className="border-b border-tea-100 dark:border-card-border-dark pb-4 mb-6">
                <h3 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300">
                  Announcement Details
                </h3>
              </div>

              <div>
                <label className="block font-medium mb-2 text-tea-700 dark:text-tea-300">
                  Topic :
                </label>
                <select
                  value={form.topic}
                  onChange={(e) => handleInputChange("topic", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select topic</option>
                  {topicOptions.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2 text-tea-700 dark:text-tea-300">
                  Subject :
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className={inputClass}
                  placeholder="Enter announcement subject"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-tea-700 dark:text-tea-300">
                  Content :
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Enter announcement content"
                />
              </div>
            </div>

            {/* Right Column - Factories & Attachments */}
            <div className="space-y-6">
              <div className="border-b border-tea-100 dark:border-card-border-dark pb-4 mb-6">
                <h3 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300">
                  Assignment & Attachments
                </h3>
              </div>

              {/* Factories Multi-Select Styled Dropdown */}
              <div>
                <label className="block font-medium mb-2 text-tea-700 dark:text-tea-300">
                  Factories :
                </label>
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={form.factories.length > 0
                        ? factoryOptions
                            .filter((f) => form.factories.includes(f.id))
                            .map((f) => f.name)
                            .join(", ")
                        : "Select factories"}
                      className={`${inputClass} text-left cursor-pointer`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                      placeholder="Select factories"
                    />
                    {dropdownOpen && (
                      <ul
                        className="absolute top-full left-0 right-0 mt-1 max-h-64 overflow-auto rounded-lg border border-tea-500 bg-card dark:bg-card-dark shadow-card z-50"
                        role="listbox"
                        tabIndex={-1}
                      >
                        {factoryOptions.map((factory) => (
                          <li
                            key={factory.id}
                            role="option"
                            aria-selected={form.factories.includes(factory.id)}
                            className={`flex items-center px-4 py-2 cursor-pointer text-ink dark:text-ink-dark hover:bg-tea-50 dark:hover:bg-white/10 ${
                              form.factories.includes(factory.id)
                                ? "bg-tea-100 dark:bg-white/10 font-semibold"
                                : ""
                            }`}
                            onClick={() => handleFactoryToggle(factory.id)}
                          >
                            <input
                              type="checkbox"
                              checked={form.factories.includes(factory.id)}
                              readOnly
                              className="w-4 h-4 mr-2 cursor-pointer text-tea-700 bg-surface dark:bg-white/5 border border-tea-100 dark:border-card-border-dark rounded focus:ring-tea-500 focus:ring-2"
                            />
                            <span className="flex items-center gap-2">
                              {factory.name}
                              {form.factories.includes(factory.id) && (
                                <span className="text-green-600 dark:text-green-400 ml-1">&#10003;</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {dropdownOpen && (
                    <ul
                      className="absolute top-full left-0 right-0 mt-1 max-h-64 overflow-auto rounded-lg border border-tea-500 bg-card dark:bg-card-dark shadow-card z-50"
                      role="listbox"
                      tabIndex={-1}
                    >
                      {factoryOptions.map((factory) => (
                        <li
                          key={factory.id}
                          role="option"
                          aria-selected={form.factories.includes(factory.id)}
                          className={`flex items-center px-4 py-2 cursor-pointer text-ink dark:text-ink-dark hover:bg-tea-50 dark:hover:bg-white/10 ${
                            form.factories.includes(factory.id)
                              ? "bg-tea-100 dark:bg-white/10 font-semibold"
                              : ""
                          }`}
                          onClick={() => handleFactoryToggle(factory.id)}
                        >
                          <input
                            type="checkbox"
                            checked={form.factories.includes(factory.id)}
                            readOnly
                            className="w-4 h-4 mr-2 cursor-pointer text-tea-700 bg-surface dark:bg-white/5 border border-tea-100 dark:border-card-border-dark rounded focus:ring-tea-500 focus:ring-2"
                          />
                          <span className="flex items-center gap-2">
                            {factory.name}
                            {form.factories.includes(factory.id) && (
                              <span className="text-green-600 dark:text-green-400 ml-1">&#10003;</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="text-sm text-ink/70 dark:text-ink-dark/70 mt-2">
                  <span className="font-medium">Selected Factories:</span>
                  {form.factories.length > 0 ? (
                    <span className="ml-2">
                      {factoryOptions
                        .filter(f => form.factories.includes(f.id))
                        .map(f => f.name)
                        .join(", ")}
                    </span>
                  ) : (
                    <span className="ml-2 text-ink/40 dark:text-muted-dark">None</span>
                  )}
                </div>
              </div>

              {/* Attach Files */}
              <div>
                <label className="block font-medium mb-2 text-tea-700 dark:text-tea-300">
                  Attach Files
                </label>
                <div className="space-y-4">
                  <div className="flex items-center flex-wrap gap-3">
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
                      className="flex items-center space-x-2 bg-tea-900 hover:bg-tea-800 text-white px-4 py-2 rounded-lg cursor-pointer select-none transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span>Choose Files</span>
                    </label>
                    <span className="text-sm text-ink/50 dark:text-muted-dark">
                      Supported: PDF, DOC, DOCX, JPG, PNG, TXT, XLSX
                    </span>
                  </div>
                  {form.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-ink/70 dark:text-ink-dark/70">
                        Selected Files:
                      </p>
                      {form.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-surface dark:bg-white/5 border border-tea-100 dark:border-card-border-dark"
                        >
                          <div className="flex items-center space-x-3">
                            <Paperclip className="w-4 h-4 text-ink/50 dark:text-muted-dark" />
                            <span className="text-sm text-ink dark:text-ink-dark">
                              {attachment.name}
                            </span>
                            <span className="text-xs text-ink/50 dark:text-muted-dark">
                              ({attachment.size})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(attachment.id)}
                            className="p-1 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
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
      </Card>
    </div>
  );
}
