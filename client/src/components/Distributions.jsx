import { useEffect } from "react";
import { UseListStore } from "../store/UseListStore";
import Items from "./Items";

function Distributions() {
  const { getAllDistributions, distributions, isLoading, deleteDistribution } =
    UseListStore();

  useEffect(() => {
    getAllDistributions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-base-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Distributions</h1>

      {distributions && distributions.length > 0 ? (
        <div className="space-y-6">
          {distributions.map((dist) => (
            <div
              key={dist._id}
              className="card bg-base-100 shadow-xl w-full mx-auto"
            >
              <div className="card-body">
                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-6">
                  <div>
                    <h2 className="card-title break-words">{dist.fileName}</h2>
                    <p className="text-sm text-gray-500">
                      Uploaded by: {dist.uploadedBy?.email}
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={`badge ${
                          dist.status === "distributed"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {dist.status}
                      </span>
                    </p>
                  </div>

                  <div className="self-start sm:self-center">
                    <button
                      className="btn bg-red-500 text-white hover:bg-red-600"
                      onClick={() =>
                        document.getElementById(`modal_delete_${dist._id}`).showModal()
                      }
                    >
                      Delete
                    </button>
                    <dialog id={`modal_delete_${dist._id}`} className="modal">
                      <div className="modal-box max-w-sm">
                        <h1 className="text-lg font-semibold mb-4">
                          Are you sure you want to delete?
                        </h1>
                        <div className="flex gap-3 justify-end">
                          <form method="dialog">
                            <button
                              className="btn bg-red-500 text-white hover:bg-red-600"
                              onClick={() => deleteDistribution(dist._id)}
                              disabled={isLoading}
                            >
                              {isLoading ? "Deleting..." : "Delete"}
                            </button>
                          </form>
                          <form method="dialog">
                            <button className="btn">Cancel</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>

                <p className="text-sm mt-2">Total Items: {dist.totalItems}</p>
                <p className="text-xs text-gray-400">
                  {new Date(dist.createdAt).toLocaleString()}
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Agents</h3>
                  <div className="space-y-3">
                    {dist.distributions.map((d) => (
                      <div
                        key={d._id}
                        className="p-3 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                      >
                        <div className="w-full">
                          <p className="font-medium break-words">
                            {d.agent?.name ? d.agent?.name : "Agent not found"}
                          </p>
                          <p className="text-xs text-gray-500 break-words">
                            {d.agent?.email}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="badge badge-outline">
                            {d.assignedCount} items
                          </span>
                          <button
                            className="btn btn-sm"
                            onClick={() =>
                              document
                                .getElementById(`modal_${d._id}`)
                                .showModal()
                            }
                          >
                            View
                          </button>

                          <dialog id={`modal_${d._id}`} className="modal">
                            <div className="modal-box max-w-lg w-full">
                              <h3 className="font-bold text-lg mb-3">
                                {d.agent?.name}’s Items
                              </h3>
                              <Items items={d.items} />
                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="btn">Close</button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No distributions found.</p>
      )}
    </div>
  );
}

export default Distributions;
