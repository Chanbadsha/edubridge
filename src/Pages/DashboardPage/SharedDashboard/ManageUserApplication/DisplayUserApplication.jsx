import toast from "react-hot-toast";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { MdFeedback } from "react-icons/md";

import { Link } from "react-router-dom";

const DisplayUserApplication = ({ applicationInfo, index, refetch }) => {
  const axiosSecret = useAxiosSecret();

  const handleRole = async (SelectedStatus) => {
    const response = await axiosSecret
      .patch(`/updateApplicationStatus/${applicationInfo._id}`, {
        status: SelectedStatus,
      })
      .then((result) => {
        toast.success(`User application updated to ${SelectedStatus}`);
        refetch();
      })
      .catch((error) => {
        toast.error("Something is wrong!");
        console.log(error);
      });
  };
  // Delete Function
  const handleDelete = () => {
    if (applicationInfo.application_status !== "rejected") {
      return toast.error("You need to rejected application first");
    }
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
              text: "This application has been deleted.",
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

  // Feedback Function
  const handleFeedback = () => {};
  return (
    <tr>
      <td>
        {" "}
        <p className="font-semibold ml-1">{index + 1}</p>
      </td>

      <td>
        <div className="font-bold">
          {applicationInfo?.Scholarship_info?.scholarship_name}
        </div>
      </td>

      <td>{applicationInfo?.user_email}</td>

      {/* Application Status */}
      <td className="text-left">
        {applicationInfo?.application_status === "pending" && (
          <p className="text-gray-500  font-semibold">Pending</p>
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

      <td>
        <select
          disabled={
            applicationInfo?.application_status === "completed" ? true : false
          }
          onChange={(event) => handleRole(event.target.value)}
          id="userRole"
          defaultValue={applicationInfo?.application_status}
          className={` border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 `}
        >
          <option value="pending">
            <p className=" text-black font-semibold">Pending</p>
          </option>

          <option value="processing">
            <p className="text-blue-500  font-semibold">Processing</p>
          </option>

          <option value="completed">
            <p className="text-green-500  font-semibold">Completed</p>
          </option>

          <option value="rejected">
            <p className="text-red-500  font-semibold">Rejected</p>
          </option>
        </select>
      </td>

      {/* View Application */}
      <td className="">
        <Link
          to={`/scholarship/${applicationInfo.Scholarship_id}`}
          className="text-blue-500 text-center  items-center flex justify-center text-xl hover:text-blue-700 transition-all duration-200 ease-in-out"
          aria-label="View Application"
          title="View Application"
        >
          <FcViewDetails />
        </Link>
      </td>

      {/* Feedback Application */}
      <td className="flex justify-center items-center ">
        <Link
          to={`/dashboard/shared/application-feedback/${applicationInfo._id}`}
          onClick={handleFeedback}
          className="text-green-500 mt-3 text-xl hover:text-green-700"
          title="Feedback Application"
        >
          <MdFeedback />
        </Link>
      </td>

      {/* Delete Application */}
      <td className="">
        <button
          onClick={handleDelete}
          className="text-red-500 text-xl btn hover:text-red-700"
          title="Cancel Application"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default DisplayUserApplication;
