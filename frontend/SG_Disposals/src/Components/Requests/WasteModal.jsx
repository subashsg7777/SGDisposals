import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { FaRecycle, FaLeaf, FaLaptop, FaTimes } from "react-icons/fa";
import { UserContext } from "../../store/UserStore";

const WasteModal = ({ isOpen, onClose, request }) => {
  const [wasteTypes, setWasteTypes] = useState([]);
  const inputRefs = useRef({}); // store refs for each type
const {user} = useContext(UserContext);

  useEffect(() => {
    if (isOpen) {
      const fetchWasteTypes = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/v1/collections/waste-lists");
          setWasteTypes(res.data); // array of {id, points, type}
          // initialize refs
          const refsObj = {};
          res.data.forEach((item) => {
            refsObj[item.type] = React.createRef();
          });
          inputRefs.current = refsObj;
        } catch (err) {
          console.error("Error fetching waste types:", err);
        }
      };
      fetchWasteTypes();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const weights = {};
    wasteTypes.forEach((item) => {
      const val = inputRefs.current[item.type].current.value;
      weights[item.type] = val ? parseInt(val, 10) : 0;
    });

    console.log("Submitting object:", weights);

    console.log({request});
    
    const collector_id = user.user_id;
    const collection_id = request.id;
    const user_id = request.user_id;

    const res = await axios.put("http://localhost:8080/api/v1/collector/collect",{collection_id,collector_id,user_id,weights});

    if (res.status == 200){
        alert(res.data.message || "Collected");
    }

    else{
        alert("Error Prcoessing the request")
    }
     // TODO: POST request with payload
    onClose();
  };

  if (!isOpen) return null;

  const getIcon = (type) => {
    if (type.includes("bio")) return <FaLeaf className="text-green-600" />;
    if (type.includes("e-waste")) return <FaLaptop className="text-green-600" />;
    return <FaRecycle className="text-green-600" />;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black bg-black opacity-90 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-[480px] p-6 transform transition-all duration-300 animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-600">
            ♻ Waste Collection
          </h2>
                  <button
          onClick={onClose}
          className=" flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
        >
          <FaTimes size={14} />
        </button>
        </div>

        {/* Waste type inputs */}
        <div className="space-y-4">
          {wasteTypes.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-green-50 rounded-lg p-3 hover:shadow-md transition"
            >
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <label className="text-green-700 font-semibold">
                  {item.type}
                  <span className="text-xs text-gray-500 ml-2">
                    (Points: {item.points})
                  </span>
                </label>
              </div>
              <input
                ref={inputRefs.current[item.type]}
                type="number"
                className="w-28 border border-green-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                placeholder="Qty"
              />
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-4 text-sm text-gray-500 italic">
          * All quantities must be entered in grams (g).
        </p>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-700 transition"
        >
          ✅ Submit
        </button>
      </div>
    </div>
  );
};

export default WasteModal;
