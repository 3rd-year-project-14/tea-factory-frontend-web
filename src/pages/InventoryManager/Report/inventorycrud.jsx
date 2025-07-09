import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/inventory"; // Update if your backend URL differs

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [form, setForm] = useState({ no: "", name: "", weight: "" });
  const [editingNo, setEditingNo] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.no || !form.name || !form.weight) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingNo === null) {
        // Add new
        await axios.post(API_URL, {
          no: parseInt(form.no),
          name: form.name,
          weight: parseFloat(form.weight),
        });
      } else {
        // Update existing
        await axios.put(`${API_URL}/${editingNo}`, {
          name: form.name,
          weight: parseFloat(form.weight),
        });
      }
      setForm({ no: "", name: "", weight: "" });
      setEditingNo(null);
      fetchInventory();
    } catch (error) {
      console.error("Error saving inventory:", error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      no: item.no,
      name: item.name,
      weight: item.weight,
    });
    setEditingNo(item.no);
  };

  const handleDelete = async (no) => {
    if (window.confirm("Are you sure to delete this item?")) {
      try {
        await axios.delete(`${API_URL}/${no}`);
        fetchInventory();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({ no: "", name: "", weight: "" });
    setEditingNo(null);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Inventory Manager CRUD</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>No: </label>
          <input
            type="number"
            name="no"
            value={form.no}
            onChange={handleInputChange}
            disabled={editingNo !== null}
            required
          />
        </div>

        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Weight: </label>
          <input
            type="number"
            step="0.01"
            name="weight"
            value={form.weight}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" style={{ marginRight: "10px" }}>
          {editingNo === null ? "Add" : "Update"}
        </button>
        {editingNo !== null && <button onClick={handleCancel}>Cancel</button>}
      </form>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {inventoryList.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No inventory found.
              </td>
            </tr>
          )}

          {inventoryList.map((item) => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td>{item.name}</td>
              <td>{item.weight}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                <button onClick={() => handleDelete(item.no)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
