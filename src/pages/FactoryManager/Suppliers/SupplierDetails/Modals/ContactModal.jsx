import React from "react";
import { X, Mail } from "lucide-react";

export default function ContactModal({
  show,
  onClose,
  supplier,
  contactData,
  setContactData,
  onConfirm,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Contact Supplier
            </h2>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Send Message To</h3>
            <p className="text-sm text-blue-700">
              {supplier.name} - {supplier.location}
            </p>
            <p className="text-sm text-blue-700">Email: {supplier.email}</p>
            <p className="text-sm text-blue-700">Phone: {supplier.phone}</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter message subject..."
                value={contactData.subject}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    subject: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[150px] resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your message here..."
                value={contactData.message}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    message: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            className="px-6 py-2 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 border border-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={
              !contactData.subject.trim() || !contactData.message.trim()
            }
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
