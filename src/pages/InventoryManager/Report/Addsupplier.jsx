import { useEffect, useState } from "react";
import axios from "axios";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({ id: null, no: "", name: "", weight: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:8080/api/suppliers");
      setSuppliers(res.data);
    } catch (err) {
      console.error("Failed to fetch suppliers:", err);
      setError("Failed to load suppliers");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For weight, ensure only numeric input allowed (optional)
    if (name === "weight" && value !== "") {
      if (!/^\d*\.?\d*$/.test(value)) return; // allow only numbers and one dot
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.no.trim() || !formData.name.trim() || !formData.weight.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (formData.id) {
        // update
        await axios.put(`http://localhost:8080/api/suppliers/${formData.id}`, formData);
        alert("Updated successfully!");
      } else {
        // create
        await axios.post(`http://localhost:8080/api/suppliers`, formData);
        alert("Added successfully!");
      }
      setFormData({ id: null, no: "", name: "", weight: "" });
      fetchSuppliers();
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Operation failed!");
    }
    setLoading(false);
  };

  const handleEdit = (supplier) => {
    setFormData(supplier);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:8080/api/suppliers/${id}`);
      fetchSuppliers();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed!");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-black mb-4">Supplier List</h2>

      {loading && <p className="text-blue-600 mb-2">Loading...</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-white">
            <th className="border p-2 text-black">No</th>
            <th className="border p-2 text-black">Name</th>
            <th className="border p-2 text-black">Weight</th>
            <th className="border p-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length === 0 && !loading && (
            <tr>
              <td colSpan="4" className="border p-2 text-center text-gray-600">
                No suppliers found.
              </td>
            </tr>
          )}

          {suppliers.map((s) => (
            <tr key={s.id}>
              <td className="border p-2 text-black">{s.no}</td>
              <td className="border p-2 text-black">{s.name}</td>
              <td className="border p-2 text-black">{s.weight}</td>
              <td className="border p-2 text-black">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(s.id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-semibold text-black mb-2">{formData.id ? "Update" : "Add"} Supplier</h2>
      <div className="space-y-2">
        <input
          name="no"
          value={formData.no}
          onChange={handleChange}
          placeholder="No"
          className="p-2 w-full border border-gray-400 rounded text-black"
          disabled={loading}
        />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-2 w-full border border-gray-400 rounded text-black"
          disabled={loading}
        />
        <input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight"
          type="number"
          className="p-2 w-full border border-gray-400 rounded text-black"
          disabled={loading}
          min="0"
          step="any"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white w-full py-2 rounded"
          disabled={loading}
        >
          {formData.id ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}
