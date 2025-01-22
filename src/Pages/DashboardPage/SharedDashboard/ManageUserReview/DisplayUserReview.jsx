import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import Swal from "sweetalert2";

const DisplayUserReview = ({ review, index, refetch }) => {
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
          .delete(`/deleteReview/${review._id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "This review has been deleted.",
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            toast.error("Opps Review Deleted Failed");
            console.log(error);
          });
      }
    });
  };

  return (
    <tr>
      <td>
        {" "}
        <p className="font-semibold ml-1">{index + 1}</p>
      </td>
      <td>
        <div className="flex items-center gap-3">
          {/* <div className="avatar"> */}
          <div className="mask mask-squircle h-12 w-12">
            <img src={review?.photo || avatar} alt={review?.reviewer} />
          </div>
          {/* </div> */}
        </div>
      </td>
      <td>
        <div className="font-bold text-xs">{review?.reviewer || "User"}</div>
      </td>
      <td className="text-xs max-w-20 text-center">
        {review?.university_name}
      </td>
      <td className="text-xs">{review?.subject_category}</td>
      <td className="text-xs">{review?.reviewDate}</td>
      <td className="max-w-5 ">{review?.reviewComment.slice(0, 30)}....</td>
      <td className="text-center">{review?.rating}</td>

      {/* Delete Scholarship */}
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

export default DisplayUserReview;
