import { useState } from "react";
import { UseAgentStore } from "../store/UseAgentStore";

function UpdateAgent({ data, id }) {
  const { updateAgent, isLoading } = UseAgentStore();
  const [agentForm, setAgentForm] = useState({
    name: data?.name || "",
    email: data?.email || "",
    mobile: data?.mobile || "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAgent(agentForm, id);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Update Agent</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={agentForm.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={agentForm.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium mb-1">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={agentForm.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={agentForm.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new password"
          />
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Update Agent"}
        </button>
      </form>
    </div>
  );
}

export default UpdateAgent;
