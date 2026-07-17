import React, { useState, useEffect } from "react";
import { getAllFertilizerCategories, getCompaniesByFertilizerCategory } from "../../../api/owner";
import { createFertilizerStock } from "../../../api/fertilizerManager";
import { getAllFertilizerStocks } from "../../../api/fertilizerManager";
import { useAuth } from "../../../contexts/AuthContext";
import {
  Plus,
  Package,
  Building2,
  Weight,
  Warehouse,
  Eye,
  Edit,
  Trash2,
  X,
  FileText,
} from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/ui/EmptyState";

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40";

function SummaryCard({ icon: Icon, iconClass, label, value }) {
  return (
    <Card hoverable>
      <div className="flex items-center">
        <div className="flex-shrink-0 h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center">
          <Icon className={`h-6 w-6 ${iconClass}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{label}</p>
          <p className="text-2xl font-heading font-semibold text-ink dark:text-ink-dark">{value}</p>
        </div>
      </div>
    </Card>
  );
}

const FertilizerStocks = () => {
  useEffect(() => {
    // Fetch all stocks from backend on mount
    getAllFertilizerStocks().then(setFertilizers).catch((err) => {
      console.error("Failed to fetch fertilizer stocks", err);
    });
  }, []);
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [fertilizers, setFertilizers] = useState([]);
  //dropdown states
  // Backend-connected dropdowns
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
//
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    quantity: "",
    weight: "",
    warehouse: "",
    purchasePrice: "",
    sellPrice: "",
  });
//dropdown data fetching
  // Fetch categories on mount
  useEffect(() => {
    getAllFertilizerCategories().then(setCategories);
  }, []);

  // Fetch companies when category changes
  useEffect(() => {
    const selectedCategory = categories.find(c => c.name === formData.name);
    if (selectedCategory) {
      getCompaniesByFertilizerCategory(selectedCategory.id).then(setCompanies);
    } else {
      setCompanies([]);
    }
  }, [formData.name, categories]);
//
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFertilizer = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.company &&
      formData.quantity &&
      formData.weight &&
      formData.warehouse &&
      formData.purchasePrice &&
      formData.sellPrice
    ) {
      const selectedCategory = categories.find(c => c.name === formData.name);
      const selectedCompany = companies.find(c => c.name === formData.company);
      const payload = {
        userId: user?.userId,
        categoryId: selectedCategory?.id,
        companyId: selectedCompany?.id,
        weightPerQuantity: parseFloat(formData.weight),
        purchasePrice: parseFloat(formData.purchasePrice),
        sellPrice: parseFloat(formData.sellPrice),
        warehouse: formData.warehouse,
        quantity: parseInt(formData.quantity),
      };
      createFertilizerStock(payload)
        .then((newStock) => {
          setFertilizers((prev) => [...prev, newStock]);
          setFormData({
            name: "",
            company: "",
            quantity: "",
            weight: "",
            warehouse: "",
            purchasePrice: "",
            sellPrice: "",
          });
          setShowAddForm(false);
        })
        .catch((err) => {
          console.error("Failed to add fertilizer stock", err);
        });
    }
  };

  const handleDeleteFertilizer = (id) => {
    setFertilizers((prev) => prev.filter((fertilizer) => fertilizer.id !== id));
  };

  const handleRequestFertilizer = () => {
    // Navigate to request fertilizer page or open request modal
    window.location.href = "/fertilizerManager/stocks/request";
  };

  return (
    <div className="min-h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mb-1">
          Fertilizer Stock Management
        </h1>
        <p className="text-ink/60 dark:text-muted-dark text-sm">
          Manage your fertilizer inventory and stock levels
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          icon={Package}
          iconClass="text-tea-700 dark:text-tea-300"
          label="Total Fertilizers"
          value={fertilizers.length}
        />
        <SummaryCard
          icon={Building2}
          iconClass="text-tea-700 dark:text-tea-300"
          label="Total Companies"
          value={new Set(fertilizers.map((f) => f.companyName || f.company)).size}
        />
        <SummaryCard
          icon={Warehouse}
          iconClass="text-tea-700 dark:text-tea-300"
          label="Warehouses Used"
          value={new Set(fertilizers.map((f) => f.warehouse)).size}
        />
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex gap-4">
        <Button variant="primary" icon={Plus} onClick={() => setShowAddForm(true)}>
          Add Fertilizer
        </Button>
        <Button variant="secondary" icon={FileText} onClick={handleRequestFertilizer}>
          Request Fertilizer
        </Button>
      </div>

      {/* Add Fertilizer Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card dark:bg-card-dark p-6 rounded-2xl shadow-card max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-bold text-ink dark:text-ink-dark">
                Add New Fertilizer
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-ink/50 dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddFertilizer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                  Fertilizer Category
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-muted-dark" size={18} />
                  <select
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${inputClass} pl-10`}
                    required
                  >
                    <option value="">Select Fertilizer Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                  Company
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-muted-dark" size={18} />
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`${inputClass} pl-10`}
                    required
                  >
                    <option value="">Select Company</option>
                    {companies.map((comp) => (
                      <option key={comp.id} value={comp.name}>{comp.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter quantity"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                  Weight
                </label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-muted-dark" size={18} />
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className={`${inputClass} pl-10`}
                    placeholder="e.g., 50kg, 25kg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                  Warehouse
                </label>
                <div className="relative">
                  <Warehouse className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-muted-dark" size={18} />
                  <select
                    name="warehouse"
                    value={formData.warehouse}
                    onChange={handleInputChange}
                    className={`${inputClass} pl-10`}
                    required
                  >
                    <option value="">Select Warehouse</option>
                    <option value="Warehouse A">Warehouse A</option>
                    <option value="Warehouse B">Warehouse B</option>
                    <option value="Warehouse C">Warehouse C</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                  Purchase Price
                </label>
                <input
                  type="number"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter purchase price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                  Sell Price
                </label>
                <input
                  type="number"
                  name="sellPrice"
                  value={formData.sellPrice}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter sell price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 justify-center"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1 justify-center">
                  Add Fertilizer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fertilizer List */}
      <Card className="!p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-tea-100 dark:border-card-border-dark">
          <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark">
            Current Stock ({fertilizers.length} items)
          </h2>
        </div>

        {fertilizers.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No fertilizers in stock"
            description="Start by adding your first fertilizer to the inventory"
            action={
              <Button variant="primary" onClick={() => setShowAddForm(true)}>
                Add Fertilizer
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-tea-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Weight/Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Purchase Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sell Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Warehouse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date Added</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tea-100 dark:divide-card-border-dark">
                {fertilizers.map((fertilizer) => (
                  <tr key={fertilizer.id} className="hover:bg-tea-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-ink dark:text-ink-dark">
                        {fertilizer.categoryName && fertilizer.companyName
                          ? `${fertilizer.categoryName} - ${fertilizer.companyName}`
                          : (fertilizer.productName || fertilizer.name || '-')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-ink dark:text-ink-dark">{fertilizer.categoryName}</div>
                      <div className="text-xs text-ink/50 dark:text-muted-dark">ID: {fertilizer.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-ink/80 dark:text-ink-dark/80">{fertilizer.companyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="info">{fertilizer.quantity} units</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-ink/80 dark:text-ink-dark/80">{fertilizer.weightPerQuantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-ink/80 dark:text-ink-dark/80">Rs. {fertilizer.purchasePrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-ink/80 dark:text-ink-dark/80">Rs. {fertilizer.sellPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="neutral" className="!bg-purple-100 !text-purple-800 dark:!bg-purple-900/30 dark:!text-purple-200">
                        {fertilizer.warehouse}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-ink/50 dark:text-muted-dark">
                        {fertilizer.createdAt ? new Date(fertilizer.createdAt).toLocaleDateString() : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-tea-700 dark:text-tea-300 hover:text-tea-800 dark:hover:text-tea-200" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDeleteFertilizer(fertilizer.id)} className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Stock Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={Package}
          iconClass="text-tea-700 dark:text-tea-300"
          label="Total Fertilizers"
          value={fertilizers.length}
        />
        <SummaryCard
          icon={Building2}
          iconClass="text-tea-700 dark:text-tea-300"
          label="Total Companies"
          value={new Set(fertilizers.map((f) => f.company)).size}
        />
        <SummaryCard
          icon={Warehouse}
          iconClass="text-tea-700 dark:text-tea-300"
          label="Warehouses Used"
          value={new Set(fertilizers.map((f) => f.warehouse)).size}
        />
      </div>
    </div>
  );
};

export default FertilizerStocks;
