import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import { Link } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import toast from "react-hot-toast";

const ScholarshipDisplay = ({ scholarship, index, refetch }) => {
  const axiosSecret = useAxiosSecret();

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
          .delete(`/deleteScholarship/${scholarship._id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "This scholarship has been deleted.",
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            toast.error("Opps Scholarship Deleted Failed");
            console.log(error);
          });
      }
    });
  };

  return (
    <tr key={index} className="hover:bg-gray-50">
      {/* Index */}
      <td className="text-center">{index + 1}</td>

      {/* University Name  */}
      <td className="text-left max-w-20">{scholarship?.university_name}</td>

      {/*  Degree */}
      <td className="text-left">{scholarship?.scholarship_degree}</td>

      {/* Subject Name */}
      <td className="text-left">{scholarship?.subject_name}</td>

      {/* Application Fee */}
      <td className="text-center pr-12">${scholarship?.application_fees}</td>

      {/* View Scholarship */}
      <td className="text-center">
        <Link
          to={`/scholarship/${scholarship._id}`}
          className="text-blue-500 text-xl hover:text-blue-700 transition-all duration-200 ease-in-out"
          aria-label="View Application"
          title="View Application"
        >
          <FcViewDetails />
        </Link>
      </td>

      {/* Edit Scholarship */}
      <td className="text-center">
        <Link
          to={`/dashboard/shared/edit-scholarship/${scholarship._id}`}
          className="text-blue-500  text-xl hover:text-blue-700"
          title="Edit Application"
        >
          <FaEdit />
        </Link>
      </td>

      {/* Delete Scholarship */}
      <td className="text-center">
        <button
          onClick={handleDelete}
          className="text-red-500 text-xl hover:text-red-700"
          title="Cancel Application"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default ScholarshipDisplay;
