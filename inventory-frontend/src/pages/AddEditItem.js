import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEditItem = () => {
  const { id } = useParams(); // If present, we’re editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    tags: "",
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const fetchItem = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:5000/api/inventory/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const item = res.data;
          setFormData({
            name: item.name,
            category: item.category,
            price: item.price,
            quantity: item.quantity,
            description: item.description,
            tags: item.tags?.join(", "),
          });
        } catch (err) {
          console.error(err);
          alert("Failed to load item data.");
        }
      };

      fetchItem();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/inventory/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Item updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/inventory", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Item added successfully!");
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error saving item.");
    }
  };

  return (
    <div className="addedititem-container">
      <h2>{isEditing ? "Edit Item" : "Add New Item"}</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          step="0.01"
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddEditItem;
