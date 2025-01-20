import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import useAxiosSecret from "../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const UserApplicationDisplay = ({ applicationInfo, index, refetch }) => {
  const axiosSecret = useAxiosSecret();
  const { setUpdateApplication, loading } = useAuth();
  // console.log(updateScholarId);
  // Delete Function
  const handleDelete = () => {
    axiosSecret
      .delete(`/application/${applicationInfo._id}`)
      .then((res) => {
        console.log(res);
        toast.success("You have successfully deleted this application");
        refetch();
      })
      .catch((error) => {
        toast.error("Opps Application Deleted Failed");

        console.log(error);
      });
  };

  // Edit Function
  const handleEdit = () => {
    if (applicationInfo?.Scholarship_info?.application_status === "pending") {
      toast.success(
        `Don't try to edit application. Application are ${applicationInfo?.Scholarship_info?.application_status}`
      );
      return;
    }
    setUpdateApplication(applicationInfo);
    toast.success(`Edit Btn CLicked ${applicationInfo._id}`);
  };
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
          <p className="text-yellow-500  font-semibold">Pending</p>
        )}
        {applicationInfo.Scholarship_info.application_status ===
          "processing" && (
          <p className="text-blue-500  font-semibold">Processing</p>
        )}
        {applicationInfo.Scholarship_info.application_status ===
          "completed" && (
          <p className="text-green-500  font-semibold">Completed</p>
        )}
        {applicationInfo.Scholarship_info.application_status === "rejected" && (
          <p className="text-red-500  font-semibold">Rejected</p>
        )}
      </td>

      {/* View Application */}
      <td className="text-center">
        <Link
          to={`/scholarship/${applicationInfo.Scholarship_id}`}
          className="text-blue-500 text-xl hover:text-blue-700 transition-all duration-200 ease-in-out"
          aria-label="View Application"
          title="View Application"
        >
          <FcViewDetails />
        </Link>
      </td>

      {/* Edit Application */}
      <td className="text-center">
        <Link
          onClick={handleEdit}
          to={`/dashboard/update-application/${applicationInfo._id}`}
          className="text-blue-500  text-xl hover:text-blue-700"
          title="Edit Application"
        >
          <FaEdit />
        </Link>
        {/* <button
          onClick={() => (
            document.getElementById("my_modal_1").showModal(), handleEdit()
          )}
          className="text-blue-500  text-xl hover:text-blue-700"
          title="Edit Application"
        >
          <FaEdit />
        </button> */}
      </td>

      {/* Cancel Application */}
      <td className="text-center">
        <button
          onClick={handleDelete}
          className="text-red-500 text-xl hover:text-red-700"
          title="Cancel Application"
        >
          <FaTrashAlt />
        </button>
      </td>

      {/* Review Application */}
      <td className="text-center">
        <button
          className="text-green-500 text-xl hover:text-green-700"
          title="Review Application"
        >
          <FaEye />
        </button>
      </td>
    </tr>
  );
};

export default UserApplicationDisplay;
