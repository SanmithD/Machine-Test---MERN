import { useState } from "react";
import AllAgents from "../components/AllAgents";
import CreateAgent from "../components/CreateAgent";
import Distributions from "../components/Distributions";
import UploadList from "../components/UploadList";

function Dashboard() {
  const [tab, setTab] = useState("agents");
  return (
    <div >
      <div className="flex justify-between p-3 " >
        <div className="flex" >
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_add").showModal()}
        >
          New Agent
        </button>
        <dialog id="my_modal_add" className="modal">
          <div className="modal-box">
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
          onClick={() => document.getElementById("my_modal_upload").showModal()}
        >
          Upload List
        </button>
        <dialog id="my_modal_upload" className="modal">
          <div className="modal-box">
            <p className="text-center my-2 text-2xl font-medium" >Select CSV</p>
            <UploadList />
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <div>
          <button className="btn" onClick={() => setTab("agents")}>
            Agents
          </button>
          <button className="btn" onClick={() => setTab("distributions")}>
            Distributions
          </button>
        </div>
        </div>

        <button className="btn" >Logout</button>
      </div>

      <div>{tab === "agents" ? <AllAgents /> : <Distributions />}</div>
    </div>
  );
}

export default Dashboard;
