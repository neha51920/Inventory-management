import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 Import navigate

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  });

  const navigate = useNavigate(); // 👈 Initialize navigate

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("process.env.API_URL/inventory", {
        params: {
          name: filters.name,
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          sortBy: filters.sortBy,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch inventory items. Please make sure you are logged in.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchItems();
  };

  return (
    <div className="dashboard-container">
      <h2>Inventory Dashboard</h2>

      {/* Add New Item Button */}
      <button
        onClick={() => navigate("/item/new")}
        style={{
          marginBottom: "1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        + Add New Item
      </button>

      {/* Filter/Search */}
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          name="category"
          placeholder="Filter by Category"
          value={filters.category}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <select
          name="sortBy"
          onChange={handleChange}
          value={filters.sortBy}
          style={{ marginRight: "0.5rem" }}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Date</option>
        </select>
        <button type="submit">Apply</button>
      </form>

      {/* Inventory Table */}
      {items.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Actions</th> {/* 👈 New column */}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.description}</td>
                <td>{item.tags?.join(", ")}</td>
                <td>
                  <button
                    onClick={() => navigate(`/item/edit/${item._id}`)}
                    style={{
                      backgroundColor: "#2196F3",
                      color: "white",
                      padding: "0.3rem 0.6rem",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No inventory items found.</p>
      )}
    </div>
  );
};

export default Dashboard;
