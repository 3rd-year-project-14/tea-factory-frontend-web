import React, { useEffect, useState } from "react";
import { FileText, Send, Package, Building2, MessageSquare, Loader2 } from "lucide-react";
import { 
  getAllFertilizerCategories,
  getCompaniesByFertilizerCategory
} from "../../../api/owner";

const ACCENT_COLOR = "#165E52";

const StockRequest = () => {
  const [formData, setFormData] = useState({
    fertilizerType: "",
    company: "",
    quantity: "",
    urgency: "normal",
    notes: "",
  });

  // Fertilizer categories dropdown options (array of {id, name})
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [companies, setCompanies] = useState([]); // Companies for selected fertilizer type
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [companyError, setCompanyError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await getAllFertilizerCategories();
        if (!mounted) return;
        setCategories(Array.isArray(res) ? res : []);
      } catch (e) {
        if (!mounted) return;
        // fallback static if error
        setCategories([
          { id: 0, name: "NPK 20-20-20" },
          { id: 1, name: "Urea" },
          { id: 2, name: "Phosphate" },
        ]);
      } finally {
        if (mounted) setLoadingCategories(false);
      }
    };
    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch companies when fertilizer type changes
  useEffect(() => {
    let mounted = true;
    const categoryObj = categories.find(c => c.name === formData.fertilizerType);
    if (!categoryObj) {
      setCompanies([]);
      return () => { mounted = false; };
    }
    const fetchCompanies = async () => {
      setLoadingCompanies(true);
      setCompanyError("");
      try {
        const res = await getCompaniesByFertilizerCategory(categoryObj.id);
        if (!mounted) return;
        // Expect [{id,name}] ; map to names for select
        setCompanies(Array.isArray(res) ? res : []);
      } catch (e) {
        if (!mounted) return;
        setCompanyError("Failed to load companies for fertilizer type");
        setCompanies([]);
      } finally {
        if (mounted) setLoadingCompanies(false);
      }
    };
    fetchCompanies();
    return () => { mounted = false; };
  }, [formData.fertilizerType, categories]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      fertilizerType: "NPK 20-20-20",
      company: "GreenGrow Ltd",
      quantity: 100,
      urgency: "high",
      status: "pending",
      dateRequested: "2024-07-15",
      notes: "Urgent stock replenishment needed",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (formData.fertilizerType && formData.company && formData.quantity) {
      const newRequest = {
        id: requests.length + 1,
        ...formData,
        quantity: parseInt(formData.quantity),
        status: "pending",
        dateRequested: new Date().toISOString().split("T")[0],
      };
      setRequests((prev) => [...prev, newRequest]);
      setFormData({
        fertilizerType: "",
        company: "",
        quantity: "",
        urgency: "normal",
        notes: "",
      });
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Stock Requests
          </h1>
          <p className="text-gray-600">
            Request additional fertilizer stock from suppliers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <FileText className="text-blue-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                New Stock Request
              </h2>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fertilizer Type
                </label>
                <div className="relative">
                  <Package className="pointer-events-none absolute left-3 top-3 text-gray-400" size={18} />
                  <select
                    name="fertilizerType"
                    value={formData.fertilizerType}
                    onChange={(e) => {
                      // reset company when fertilizer type changes
                      setFormData(prev => ({...prev, fertilizerType: e.target.value, company: ""}));
                    }}
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:opacity-60"
                    required
                    disabled={loadingCategories && categories.length === 0}
                  >
                    <option value="" disabled>
                      {loadingCategories && categories.length === 0 ? "Loading fertilizer types..." : "Select fertilizer type"}
                    </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {loadingCategories && (
                    <Loader2 className="absolute right-3 top-3 animate-spin text-gray-400" size={18} />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Supplier
                </label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-3 text-gray-400" size={18} />
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:opacity-60"
                    required
                    disabled={loadingCompanies || !formData.fertilizerType}
                  >
                    <option value="" disabled>
                      {formData.fertilizerType
                        ? loadingCompanies
                          ? "Loading companies..."
                          : companies.length
                            ? "Select a company"
                            : companyError || "No companies found"
                        : "Select fertilizer type first"}
                    </option>
                    {companies.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {loadingCompanies && (
                    <Loader2 className="absolute right-3 top-3 animate-spin text-gray-400" size={18} />
                  )}
                </div>
                {companyError && (
                  <p className="mt-1 text-xs text-red-600">{companyError}</p>
                )}
              </div>

              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity Needed
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter quantity"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urgency Level
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes or requirements..."
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: ACCENT_COLOR }}
                className="w-full hover:opacity-90 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-opacity"
              >
                <Send size={18} />
                Submit Request
              </button>
            </form>
          </div>

          {/* Request History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Requests
            </h2>

            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      {request.fertilizerType}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                        request.urgency
                      )}`}
                    >
                      {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{request.company}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Quantity: {request.quantity} units
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Requested on {request.dateRequested}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  {request.notes && (
                    <p className="text-xs text-gray-500 mt-2 italic">
                      "{request.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockRequest;
