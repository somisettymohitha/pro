npm install react-router-dom tailwindcss postcss autoprefixer
npx tailwindcss init -p
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-50 text-gray-800;
}
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PropertyForm from "./pages/PropertyForm";
import Recommendations from "./pages/Recommendations";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<PropertyForm />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Property Value Enhancer</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/form" className="hover:text-blue-600">Property Form</Link>
          <Link to="/recommendations" className="hover:text-blue-600">Recommendations</Link>
          <Link to="/admin" className="hover:text-blue-600">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
export const ideas = [
  {
    category: "Renovation",
    text: "Upgrade kitchen cabinets and countertops."
  },
  {
    category: "Interior",
    text: "Use neutral wall colors to appeal to more buyers."
  },
  {
    category: "Energy",
    text: "Install LED lighting to reduce electricity usage."
  }
];
export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to the Property Value Enhancement System</h1>
      <p>
        This system helps homeowners and investors identify improvements that can increase
        the overall value of their property. Enter your property details and receive
        curated recommendations.
      </p>

      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="font-semibold text-xl">How It Works</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>Fill out the property form</li>
          <li>View personalized improvement suggestions</li>
          <li>Manage ideas through the Admin Dashboard</li>
        </ul>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PropertyForm() {
  const [form, setForm] = useState({
    type: "",
    size: "",
    location: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("propertyForm", JSON.stringify(form));
    navigate("/recommendations");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Property Details</h1>

      <div>
        <label className="block mb-1">Property Type</label>
        <select
          name="type"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select type</option>
          <option>Apartment</option>
          <option>House</option>
          <option>Commercial</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Size (sq ft)</label>
        <input
          type="number"
          name="size"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Location</label>
        <input
          type="text"
          name="location"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <button className="bg-blue-600 text-white p-2 rounded w-full">
        Get Recommendations
      </button>
    </form>
  );
}
import { ideas } from "../data";

export default function Recommendations() {
  const form = JSON.parse(localStorage.getItem("propertyForm") || "{}");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recommendations</h1>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold text-lg">Property Summary</h2>
        <p><strong>Type:</strong> {form.type}</p>
        <p><strong>Size:</strong> {form.size} sq ft</p>
        <p><strong>Location:</strong> {form.location}</p>
      </div>

      <h2 className="font-semibold text-xl mb-3">Suggested Improvements</h2>

      <div className="space-y-3">
        {ideas.map((item, i) => (
          <div key={i} className="p-4 border rounded bg-white">
            <h3 className="font-bold">{item.category}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
