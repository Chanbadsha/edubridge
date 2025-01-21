import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ReviewDisplay = ({ reviewInfo, index, refetch }) => {
  const axiosSecret = useAxiosSecret();
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
          .delete(`/deleteReview/${reviewInfo._id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
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
  // Review Edit Function
  const handleEdit = () => {};

  return (
    <tr key={index} className="hover:bg-gray-50">
      {/* Index */}
      <td className="text-center">{index + 1}</td>

      {/* University Name  */}

      <td className="text-center">{reviewInfo?.university_name}</td>
      {/* Scholarship Degree */}
      <td className="text-center">{reviewInfo?.scholarship_name}</td>

      {/* Review*/}
      <td className="text-center">{reviewInfo?.reviewComment}</td>

      {/* Review Date */}
      <td className="text-center">{reviewInfo?.reviewDate}</td>

      {/* Edit Review */}
      <td className="text-center">
        <Link
          onClick={handleEdit}
          to={`/dashboard/update-review/${reviewInfo._id}`}
          className="text-blue-500  text-xl hover:text-blue-700"
          title="Edit Application"
        >
          <FaEdit />
        </Link>
      </td>

      {/* Cancel Review */}
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
export default ReviewDisplay;
