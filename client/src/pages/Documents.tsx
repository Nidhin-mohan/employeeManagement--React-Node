import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProfileNav from "../components/ProfileNav";
import axios from "axios";
import { toast } from "react-toastify";
import qs from "qs";

interface Document {
  id: number;
  Name: string;
  ServerRelativeUrl: string;
}

const Documents: React.FC = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [files, setFiles] = React.useState<Document[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.put(
        `http://localhost:5000/api/v1/employee/document/${id}`,
        formData
      );

      toast.success("file uploaded sucsesfuly", {
        className: "toastify-success",
      });
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/employee/files/${id}`
      );
      const files = response.data.files;
      console.log(files);
      console.log(typeof files);
      setFiles(files);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const downloadFile = async (serverRelativePath?: string) => {
    try {
      if (!serverRelativePath) {
        throw new Error("serverRelativePath parameter is required");
      }
      const response = await axios.get("http://localhost:5000/api/v1/employee/document/download", {
        params: { serverRelativePath },
        paramsSerializer: params => {
          return qs.stringify(params, { encode: false });
        },
        responseType: "blob",
      });
      const blob = new Blob([response.data]);
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute("download", serverRelativePath.split("/").pop() || "");
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <Layout>
      <ProfileNav id={Number(id)} />
      <div className="bg-slate-300 py-20">
        {/* upload section */}
        <div className="mb-4  mt-[-20px] mx-auto w-[1200px] bg-slate-200 p-6 rounded-sm">
          <h2 className="text-xl font-bold mb-2">Upload File</h2>
          <input type="file" onChange={handleFileSelect} className="mb-2" />
          <button
            type="button"
            onClick={handleUploadClick}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Upload
          </button>
        </div>

        {/* file  */}
        <div className="mb-4 mx-auto w-[1200px]">
          <h2 className="text-xl font-bold mb-2">File List</h2>
          <ul>
            {files.map((file) => (
              <li
                key={file?.Name}
                className="flex justify-between items-center bg-slate-50 p-2 m-1 rounded  border-b border-gray-300"
              >
                <div className="flex items-center ">
                  <svg
                    className="w-8 h-8 mr-2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5 5.5h-7a1 1 0 0 0-1 1v7a1 1 0 0 1-1 1h-2v-2h3.5a.5.5 0 0 0 .5-.5V6.5h-6v11h6v-4a1 1 0 0 1 1-1H16v-2h2a1 1 0 0 1 1 1v4h3v-7a1 1 0 0 0-1-1z"
                      fill="#FFFFF"
                    />
                    <path
                      d="M8.5 13.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H9a.5.5 0 0 1-.5-.5z"
                      fill="#FFF"
                    />
                  </svg>
                  <span className="text-lg">{file?.Name}</span>
                </div>

                <button
                  className="text-black py-2 px-2 rounded-lg"
                  onClick={() => downloadFile(file?.ServerRelativeUrl)}
                >
                  <i className="fa fa-download"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
