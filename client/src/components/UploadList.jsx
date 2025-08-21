import { useState } from "react";
import { UseListStore } from "../store/UseListStore";

function UploadList() {
  const { uploadFile, isLoading } = UseListStore();
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!csvFile) return alert("Please select a CSV file first");

    const formData = new FormData();
    formData.append("cvsFile", csvFile);

    await uploadFile(formData);
    setCsvFile(null); 
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="h-fit flex justify-center items-center flex-col space-y-4">
      <input
        id="fileInput"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs"
      />

      <button
        onClick={handleUpload}
        disabled={isLoading}
        className="btn btn-primary"
      >
        {isLoading ? "Uploading..." : "Upload CSV"}
      </button>
    </div>
  );
}

export default UploadList;
