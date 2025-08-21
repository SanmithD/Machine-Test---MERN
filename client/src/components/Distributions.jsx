import { useEffect } from "react";
import { UseListStore } from "../store/UseListStore";
import Items from "./Items";

function Distributions() {
  const { getAllDistributions, distributions, isLoading } = UseListStore();

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
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Distributions</h1>

      {distributions && distributions.length > 0 ? (
        <div className="space-y-6">
          {distributions.map((dist) => (
            <div key={dist._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{dist.fileName}</h2>
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
                <p className="text-sm">Total Items: {dist.totalItems}</p>
                <p className="text-xs text-gray-400">
                  {new Date(dist.createdAt).toLocaleString()}
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Agents</h3>
                  <div className="space-y-2">
                    {dist.distributions.map((d) => (
                      <div
                        key={d._id}
                        className="p-2 border rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{d.agent?.name}</p>
                          <p className="text-xs text-gray-500">
                            {d.agent?.email}
                          </p>
                        </div>
                        <div>
                          <span className="badge badge-outline">
                            {d.assignedCount} items
                          </span>
                          <button
                            className="btn btn-sm ml-2"
                            onClick={() =>
                              document
                                .getElementById(`modal_${d._id}`)
                                .showModal()
                            }
                          >
                            View
                          </button>

                          <dialog id={`modal_${d._id}`} className="modal w-full ">
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">
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
