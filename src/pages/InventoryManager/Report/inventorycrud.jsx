import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Edit, Trash2 } from "lucide-react";

const API_URL = "http://localhost:8080/api/inventory"; // Update if your backend URL differs

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [form, setForm] = useState({
    id: null,
    item: "",
    quantity: "",
    unit: "",
    lastUpdated: "",
  });
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Fetch all inventory on component mount
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(API_URL);
      setInventoryList(response.data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (inv) => {
    setForm(inv);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this item?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchInventory();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.item || !form.quantity || !form.unit) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editMode) {
        // Update existing
        await axios.put(`${API_URL}/${form.id}`, {
          item: form.item,
          quantity: parseInt(form.quantity),
          unit: form.unit,
        });
      } else {
        // Add new
        await axios.post(API_URL, {
          item: form.item,
          quantity: parseInt(form.quantity),
          unit: form.unit,
        });
      }
      setForm({ id: null, item: "", quantity: "", unit: "", lastUpdated: "" });
      setShowForm(false);
      fetchInventory();
    } catch (error) {
      console.error("Error saving inventory:", error);
    }
  };

  const filtered = inventoryList.filter((inv) =>
    inv.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Always-visible Add New Inventory Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <h2 className="text-lg font-bold text-green-700 mb-2">
            Add New Inventory
          </h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!form.item || !form.quantity || !form.unit) {
                alert("Please fill all fields");
                return;
              }
              try {
                await axios.post(API_URL, {
                  item: form.item,
                  quantity: parseInt(form.quantity),
                  unit: form.unit,
                });
                setForm({
                  id: null,
                  item: "",
                  quantity: "",
                  unit: "",
                  lastUpdated: "",
                });
                fetchInventory();
              } catch (error) {
                console.error("Error saving inventory:", error);
              }
            }}
            className="space-y-4"
          >
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="item"
                  value={form.item}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  name="unit"
                  value={form.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-800">
            Inventory Management
          </h1>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search inventory..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">
                      No inventory found.
                    </td>
                  </tr>
                )}
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-green-50">
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {inv.item}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{inv.quantity}</td>
                    <td className="px-6 py-3 text-gray-700">{inv.unit}</td>
                    <td className="px-6 py-3 text-gray-500">
                      {inv.lastUpdated}
                    </td>
                    <td className="px-6 py-3 flex gap-2">
                      <button
                        className="p-2 rounded hover:bg-green-100 text-green-700"
                        onClick={() => handleEdit(inv)}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 rounded hover:bg-red-100 text-red-600"
                        onClick={() => handleDelete(inv.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-green-700">
                {editMode ? "Edit Item" : "Add Item"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="item"
                    value={form.item}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={form.unit}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
                  >
                    {editMode ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
