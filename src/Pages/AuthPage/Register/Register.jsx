import Lottie from "lottie-react";
import useAuth from "../../../Hooks/useAuth";
import registerLottie from "../../../assets/Lottie/registerLottie.json";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import bgImg from "../../../assets/Auth/authentication.png";
import Loader from "../../../Components/Loader/Loader";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
const Register = () => {
  const {
    isDarkMode,
    loading,
    googleLogin,
    setLoading,
    updateUserProfile,
    createUser,
  } = useAuth();

  if (loading) {
    return <Loader />;
  }
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { from } = location?.state || { from: { pathname: "/" } };
  const navigate = useNavigate();
  // Create User
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(({ user }) => {
        updateUserProfile(data.name, data?.photoUrl).then((result) => {
          const userInfo = {
            Name: user.displayName,
            Email: user.email,
            Role: "Admin",
          };

          axiosPublic
            .post("/userSave", userInfo)
            .then((res) => {
              setLoading(false);
            })
            .catch((error) => {
              toast.error("Failed to save user information. Please try again.");
            });
          toast.success("Account Create Successful!");
          setLoading(false);
          navigate(from);
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  // Social Login
  const handlegoogleLogin = () => {
    googleLogin()
      .then(({ user }) => {
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "Admin",
        };

        axiosPublic
          .post("/userSave", userInfo)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Failed to save user information. Please try again.");
          });
        toast.success("Google Login successful!");
        setLoading(false);
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Google Login failed. Please try again.");
      });
  };

  return (
    <div
      className={`relative py-12 min-h-[calc(100vh-306px)] flex justify-center items-center ${
        isDarkMode ? "bg-gray-900" : "bg-backgroundLight"
      }`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Login Card */}
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="relative bg-opacity-80 z-10 hero max-w-7xl w-full shadow-lg lg:rounded-lg"
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* Lottie Animation */}
          <div className="text-center w-full lg:w-1/2">
            <Lottie animationData={registerLottie} />
          </div>

          {/* Login Form */}
          <div
            className={`card w-full lg:w-1/2 max-w-5xl p-8 ${
              isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-900"
            } shadow-md rounded-lg`}
          >
            {/* Header */}
            <div className="text-center mb-6 space-y-2">
              <h2
                className={`${
                  isDarkMode ? "text-textBlack" : "text-textLight"
                } text-center text-4xl mb-6 space-y-2`}
              >
                Build Your Bridge to Success
              </h2>
              <p
                className={`${
                  isDarkMode ? "text-textBlack" : "text-textLight"
                }`}
              >
                Register with EduBridge to connect with universities, find the
                best scholarships, and take charge of your academic journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span
                    className={`label-text  font-medium ${
                      isDarkMode ? "text-textBlack" : "text-textLight"
                    }`}
                  >
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`input  input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500  ${
                    isDarkMode ? "text-textLight" : "text-textLight"
                  }`}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span
                    className={`label-text  font-medium ${
                      isDarkMode ? "text-textBlack" : "text-textLight"
                    }`}
                  >
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`input  input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500  ${
                    isDarkMode ? "text-textLight" : "text-textLight"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span
                    className={`label-text font-medium ${
                      isDarkMode ? "text-textBlack" : "text-textLight"
                    }`}
                  >
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={`input  input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500  ${
                    isDarkMode ? "text-textLight" : "text-textLight"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-control mt-4">
                <label className="label">
                  <span
                    className={`label-text font-medium ${
                      isDarkMode ? "text-textBlack" : "text-textLight"
                    }`}
                  >
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  className={`input  input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500  ${
                    isDarkMode ? "text-textLight" : "text-textLight"
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 6,
                      message: "Confirm Password must be at least 6 characters",
                    },
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-300"
                >
                  Register
                </button>
              </div>

              {/* Already Registered */}
              <div className="text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-500 font-medium underline hover:text-blue-600"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>

            {/* Social Login */}
            <div className="flex flex-col items-center mt-6">
              {/* Divider */}
              <div
                className={`divider text-sm ${
                  isDarkMode
                    ? "text-white  before:bg-white after:bg-white "
                    : "text-gray-500"
                } `}
              >
                OR
              </div>

              {/* Social Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handlegoogleLogin}
                  className={`btn btn-outline rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ${
                    isDarkMode ? "text-textBlack" : "text-textLight"
                  } `}
                >
                  <FaGoogle size={20} />
                </button>
                <button
                  className={`btn btn-outline rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ${
                    isDarkMode ? "text-textBlack" : "text-textLight"
                  } `}
                >
                  <FaFacebook size={20} />
                </button>
                <button
                  className={`btn btn-outline rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ${
                    isDarkMode ? "text-textBlack" : "text-textLight"
                  } `}
                >
                  <FaGithub size={20} />
                </button>
                <button
                  className={`btn btn-outline rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ${
                    isDarkMode ? "text-textBlack" : "text-textLight"
                  } `}
                >
                  <FaTwitter size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
