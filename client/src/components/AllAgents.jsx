import { Edit2, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { UseAgentStore } from "../store/UseAgentStore";
import UpdateAgent from "./UpdateAgent";

function AllAgents() {
  const { getAllAgents, agents, isLoading } = UseAgentStore();
  const [selectedAgent] = useState(null);

  useEffect(() => {
    getAllAgents();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Agents</h1>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : agents && agents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div key={agent._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{agent.name}</h2>
                <p className="text-sm text-gray-500">{agent.email}</p>
                <p className="text-sm flex "><Phone size={20} />{agent.mobile}</p>
                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`badge ${
                      agent.isActive ? "badge-success" : "badge-error"
                    }`}
                  >
                    {agent.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  className="btn btn-sm mt-3"
                  onClick={() =>
                    document
                      .getElementById(`update_modal_${agent._id}`)
                      .showModal()
                  }
                >
                  <Edit2 size={16} /> Edit
                </button>
              </div>

              <dialog id={`update_modal_${agent._id}`} className="modal">
                <div className="modal-box max-w-lg">
                  <UpdateAgent data={agent} id={agent._id} />
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No agents found.</p>
      )}

      <dialog id="update_modal" className="modal">
        <div className="modal-box max-w-lg">
          {selectedAgent && (
            <UpdateAgent data={selectedAgent} id={selectedAgent._id} />
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AllAgents;
