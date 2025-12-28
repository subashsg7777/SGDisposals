import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; 
import axios from "axios";
import Navbar from "../Navbar";
import WasteModal from "./WasteModal";

const CollectionRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[selectedRequest,setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/collections/requests"); 
        console.log({res});
        
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };
    fetchRequests();
  }, []);

  const handleCollect = async (id) => {
    try {
      await axios.post(`/api/collection_requests/${id}/collect`);
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: "Collected" } : req
        )
      );
    } catch (err) {
      console.error("Error collecting request:", err);
    }
  };

  return (
    <div className="p-6 inset-0 bg-white px-5 fixed">
    <Navbar />
      <div className="p-6 bg-white px-20 py-15">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">
        Collection Requests
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-500 text-white">
            <tr className="text-center">
              <th className="py-3 px-4 text-center">ID</th>
              <th className="py-3 px-4 text-center">User</th>
              <th className="py-3 px-4 text-center">Address</th>
              <th className="py-3 px-4 text-center">User Id</th>
              <th className="py-3 px-4 text-center">Date</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {requests.map((req) => (
              <tr
                key={req.id}
                className="border-b bg-gray-200 hover:bg-gray-50 transition-colors text-black"
              >
                <td className="py-3 px-4">{req.id}</td>
                <td className="py-3 px-4">{req.name}</td>
                <td className="py-3 px-4">{req.address}</td>
                <td className="py-3 px-4">{req.user_id}</td>
                <td className="py-3 px-4">{req.created_at}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      req.status === "Collected"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleCollect(req.id)}
                    className="text-green-500 hover:text-green-700 transition-colors"
                    disabled={req.status === "Collected"}
                  >
                    <FaCheckCircle size={20} onClick={() =>{ setIsModalOpen(true); setSelectedRequest(req)}}/>
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 text-center text-gray-500 italic"
                >
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <WasteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} request={selectedRequest}/>
    </div>
  );
};

export default CollectionRequestsTable;
