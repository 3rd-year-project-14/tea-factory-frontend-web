import { useEffect, useState } from "react";
import axios from "axios";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({ id: null, no: "", name: "", weight: "" });

  const fetchSuppliers = async () => {
    const res = await axios.get("http://localhost:8080/api/suppliers");
    setSuppliers(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
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
  };

  const handleEdit = (supplier) => {
    setFormData(supplier);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete?")) {
      await axios.delete(`http://localhost:8080/api/suppliers/${id}`);
      fetchSuppliers();
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-black mb-4">Supplier List</h2>
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
          className=" p-2 w-full border border-gray-400 rounded text-black"
        />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className=" p-2 w-full border border-gray-400 rounded text-black"
        />
        <input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight"
          className=" p-2 w-full border border-gray-400 rounded text-black "
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white w-full py-2 rounded "
        >
          {formData.id ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}
