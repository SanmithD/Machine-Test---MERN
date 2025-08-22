import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllAgents from "../components/AllAgents";
import CreateAgent from "../components/CreateAgent";
import Distributions from "../components/Distributions";
import UploadList from "../components/UploadList";
import { UseAuthStore } from "../store/UseAuthStore";

function Dashboard() {
  const navigate = useNavigate();
  const { logout, isLoading } = UseAuthStore();

  const handleLogout = async () => {
    await logout(navigate);
  };

  const [tab, setTab] = useState("agents");

  return (
    <div className="p-3">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl tracking-wide font-medium pl-5">Dashboard</h1>

        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_add").showModal()}
          >
            New Agent
          </button>
          <dialog id="my_modal_add" className="modal">
            <div className="modal-box max-w-lg">
              <CreateAgent />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <button
            className="btn"
            onClick={() =>
              document.getElementById("my_modal_upload").showModal()
            }
          >
            Upload List
          </button>
          <dialog id="my_modal_upload" className="modal">
            <div className="modal-box max-w-lg">
              <p className="text-center my-2 text-2xl font-medium">Select CSV</p>
              <UploadList />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <div className="flex gap-2">
            <button
              className={`btn ${tab === "agents" ? "btn-primary" : ""}`}
              onClick={() => setTab("agents")}
            >
              Agents
            </button>
            <button
              className={`btn ${tab === "distributions" ? "btn-primary" : ""}`}
              onClick={() => setTab("distributions")}
            >
              Distributions
            </button>
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="btn bg-red-500 text-white hover:bg-red-600"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <div className="mt-5">
        {tab === "agents" ? <AllAgents /> : <Distributions />}
      </div>
    </div>
  );
}

export default Dashboard;
