import { useState } from "react";
import { UseAgentStore } from "../store/UseAgentStore";

function CreateAgent() {
  const { addAgent, isLoading } = UseAgentStore();
  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAgent(agentForm);

    setAgentForm({
      name: "",
      email: "",
      mobile: "",
      password: "",
    });
  };

  return (
    <div className="h-fit flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Agent</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={agentForm.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter agent name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={agentForm.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={agentForm.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Add country code"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={agentForm.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Add Agent"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAgent;
