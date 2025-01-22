import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import useAxiosSecret from "../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const UserApplicationDisplay = ({ applicationInfo, index, refetch }) => {
  const axiosSecret = useAxiosSecret();
  const { setUpdateApplication, loading } = useAuth();

  // Delete Function
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecret
          .delete(`/application/${applicationInfo._id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            toast.error("Opps Application Deleted Failed");

            console.log(error);
          });
      }
    });
  };

  // Edit Function
  const handleEdit = () => {
    if (applicationInfo?.application_status !== "pending") {
      toast.error(
        `You cannot edit the application.  Application are ${applicationInfo?.application_status}.`
      );
      return;
    }
    setUpdateApplication(applicationInfo);
  };

  // Review Function
  const handleReview = () => {
    setUpdateApplication(applicationInfo);
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
        {applicationInfo.Scholarship_info.scholarship_degree}
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
        {applicationInfo?.application_status === "pending" && (
          <p className="text-yellow-500  font-semibold">Pending</p>
        )}
        {applicationInfo?.application_status === "processing" && (
          <p className="text-blue-500  font-semibold">Processing</p>
        )}
        {applicationInfo?.application_status === "completed" && (
          <p className="text-green-500  font-semibold">Completed</p>
        )}
        {applicationInfo?.application_status === "rejected" && (
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
        {applicationInfo?.application_status === "pending" ? (
          <>
            {" "}
            <Link
              onClick={handleEdit}
              to={`/dashboard/update-application/${applicationInfo._id}`}
              className="text-blue-500  text-xl hover:text-blue-700"
              title="Edit Application"
            >
              <FaEdit />
            </Link>
          </>
        ) : (
          <>
            {" "}
            <button
              onClick={handleEdit}
              className="text-blue-500  text-xl hover:text-blue-700"
              title="Edit Application"
            >
              <FaEdit />
            </button>
          </>
        )}
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
        <Link
          onClick={handleReview}
          to={`/dashboard/review-application/${applicationInfo._id}`}
          className="text-green-500 text-xl hover:text-green-700"
          title="Review Application"
        >
          <FaEye />
        </Link>
      </td>
    </tr>
  );
};

export default UserApplicationDisplay;
