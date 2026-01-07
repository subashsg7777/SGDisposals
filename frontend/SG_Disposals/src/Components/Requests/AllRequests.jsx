import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; 
import api from '../../api/axios';
import Navbar from "../Navbar";
import WasteModal from "./WasteModal";
import Footer from "../Footer";

const CollectionRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[selectedRequest,setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get(`${import.meta.env.VITE_BASE_URL}/collections/requests`); 
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
      await api.post(`/api/collection_requests/${id}/collect`);
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
    <div className="p-6 bg-white px-5 flex flex-col min-h-screen min-w-screen">
    <Navbar />
      <div className="p-6 bg-white px-20 py-15">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">
        Collection Requests
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        {/* Mobile: stacked cards */}
        <div className="md:hidden px-2">
          {requests.length === 0 && (
            <div className="py-6 text-center text-gray-500 italic">No requests found</div>
          )}
          {requests.map((req) => (
            <div key={req.id} className="mb-3 p-4 bg-gray-100 rounded-lg border">
              <div className="flex justify-between items-start">
                <div className="text-sm text-gray-600">ID</div>
                <div className="text-sm font-medium text-black">{req.id}</div>
              </div>
              <div className="flex justify-between items-start mt-2">
                <div className="text-sm text-gray-600">User</div>
                <div className="text-sm text-black">{req.name}</div>
              </div>
              <div className="flex justify-between items-start mt-2">
                <div className="text-sm text-gray-600">Address</div>
                <div className="text-sm text-black">{req.address}</div>
              </div>
              <div className="flex justify-between items-start mt-2">
                <div className="text-sm text-gray-600">User Id</div>
                <div className="text-sm text-black">{req.user_id}</div>
              </div>
              <div className="flex justify-between items-start mt-2">
                <div className="text-sm text-gray-600">Date</div>
                <div className="text-sm text-black">{req.created_at}</div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    req.status === "Collected"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {req.status}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => { setIsModalOpen(true); setSelectedRequest(req); }}
                    className="text-green-500 hover:text-green-700 transition-colors disabled:opacity-50"
                    disabled={req.status === "Collected"}
                  >
                    <FaCheckCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop/tablet: show on md+ */}
        <div className="hidden md:block">
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
                      onClick={() => { setIsModalOpen(true); setSelectedRequest(req); }}
                      className="text-green-500 hover:text-green-700 transition-colors"
                      disabled={req.status === "Collected"}
                    >
                      <FaCheckCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
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
    </div>
    <WasteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} request={selectedRequest}/>
    <div className="just">
      <Footer />
    </div>
    </div>
  );
};

export default CollectionRequestsTable;
