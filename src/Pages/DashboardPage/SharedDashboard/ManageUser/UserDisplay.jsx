import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import avatar from "../../../../assets/Logo/profile.png";
import { Link } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import toast from "react-hot-toast";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import useAuth from "../../../../Hooks/useAuth";

const UserDisplay = ({ user, index, refetch }) => {
  const { user: mainUser } = useAuth();

  const axiosSecret = useAxiosSecret();
  // console.log(user.role);
  const handleRole = async (SelectedRole) => {
    const response = await axiosSecret
      .patch(`/updateUser/${user._id}`, {
        role: SelectedRole,
      })
      .then((result) => {
        toast.success(`User role updated to ${SelectedRole}`);
        refetch();
      })
      .catch((error) => {
        toast.error("Something is wrong!");
        console.log(error);
      });
  };
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
          .delete(`/deleteUser/${user._id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "This user has been deleted.",
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            toast.error("Opps user Deleted Failed");
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
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={user?.photoURL || avatar} alt={user?.name} />
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="font-bold">{user?.name || user?.role}</div>
      </td>
      <td>{user?.email}</td>
      <td>
        <select
          disabled={mainUser.email === user.email ? true : false}
          onChange={(event) => handleRole(event.target.value)}
          id="userRole"
          defaultValue={user?.role}
          className={` border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 `}
        >
          <option value="Admin">Admin</option>
          <option value="Moderator">Moderator</option>
          <option value="User">User</option>
        </select>
      </td>

      {/* Delete Scholarship */}
      <td className="">
        {mainUser?.email === user?.email ? (
          <>
            {" "}
            <button
              className="text-green-500 text-xl btn hover:text-green-700"
              title="Cancel Application"
            >
              <FaTrashAlt />
            </button>
          </>
        ) : (
          <>
            {" "}
            <button
              onClick={handleDelete}
              className="text-red-500 text-xl btn hover:text-red-700"
              title="Cancel Application"
            >
              <FaTrashAlt />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserDisplay;
