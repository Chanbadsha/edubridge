import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const UserApplicationDisplay = ({ applicationInfo, index }) => {
  return (
    <tr key={index} className="hover:bg-gray-50">
      {/* Index */}
      <td className="text-center">{index + 1}</td>

      {/* University Name and Location */}
      <td>
        <div className="flex flex-col">
          <span className="font-semibold">
            {applicationInfo.Scholarship_info.university_name}
          </span>
          <span className="text-sm text-gray-500">
            {applicationInfo.Scholarship_info.university_location?.country}
          </span>
        </div>
      </td>

      {/* Applied Degree */}
      <td className="text-center">
        {applicationInfo.Scholarship_info.scholarship_category}
      </td>

      {/* Subject Name */}
      <td className="text-center">
        {applicationInfo.Scholarship_info.subject_name}
      </td>

      {/* Application Fee */}
      <td className="text-center">
        ${applicationInfo.Scholarship_info.application_fees}
      </td>

      {/* Service Charge */}
      <td className="text-center">
        ${applicationInfo.Scholarship_info.service_charge}
      </td>

      {/* Application Status */}
      <td className="text-center">
        {applicationInfo.Scholarship_info.application_status === "pending" && (
          <p className="text-yellow-500 font-semibold">Pending</p>
        )}
        {applicationInfo.Scholarship_info.application_status ===
          "processing" && (
          <p className="text-blue-500 font-semibold">Processing</p>
        )}
        {applicationInfo.Scholarship_info.application_status ===
          "completed" && (
          <p className="text-green-500 font-semibold">Completed</p>
        )}
        {applicationInfo.Scholarship_info.application_status === "rejected" && (
          <p className="text-red-500 font-semibold">Rejected</p>
        )}
      </td>

      {/* Edit Application */}
      <td className="text-center">
        <button className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
      </td>

      {/* Cancel Application */}
      <td className="text-center">
        <button className="text-red-500 hover:text-red-700">
          <FaTrashAlt />
        </button>
      </td>

      {/* Review Application */}
      <td className="text-center">
        <button className="text-green-500 hover:text-green-700">
          <FaEye />
        </button>
      </td>
    </tr>
  );
};

export default UserApplicationDisplay;
