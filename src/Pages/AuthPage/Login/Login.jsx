import Lottie from "lottie-react";
import useAuth from "../../../Hooks/useAuth";
import loginLottie from "../../../assets/Lottie/loginLottie.json";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import bgImg from "../../../assets/Auth/authentication.png";
import toast from "react-hot-toast";
import Loader from "../../../Components/Loader/Loader";
import useAxiosPublic from "../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import avatar from "../../../assets/Logo/profile.png";
import { useState } from "react";

const Login = () => {
  const { isDarkMode, googleLogin, setLoading, loading, loginUser } = useAuth();
    if (loading) {
    return <Loader />;
  }
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location?.state || { from: { pathname: "/" } };

  const [demoCredentials, setDemoCredentials] = useState({
    email: "",
    password: "",
  });

 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true)
    loginUser(data.email, data.password)
      .then(() => {
        const userInfo = {
          name: "User",
          email: data?.email,
          role: "User",
          photoURL: avatar,
        };

        axiosPublic.post("/userSave", userInfo);
        navigate(from);
        toast.success("Login successful!");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Login failed. Please try again.");
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(({ user }) => {
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "User",
          photoURL: user.photoURL,
        };

        axiosPublic.post("/userSave", userInfo);
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

  // Function to autofill demo credentials
  const fillDemoCredentials = async(role) => {
    
    let email, password;
    switch (role) {
      case "Admin":
        email = "admin@demo.com";
        password = "Admin123";
        break;
      case "Moderator":
        email = "moderator@demo.com";
        password = "Mod12345";
        break;
      default:
        email = "user@demo.com";
        password = "User123";
    }
    await setValue("email", email);
   await setValue("password", password);
   await setDemoCredentials({ email, password });
  };

  return (
    <div
      className={`relative py-12 min-h-[calc(100vh-306px)] flex justify-center items-center ${
        isDarkMode ? "bg-gray-900" : "bg-backgroundLight"
      }`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="relative bg-opacity-80 z-10 hero container w-full shadow-lg lg:rounded-lg"
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center w-full lg:w-1/2">
            <Lottie animationData={loginLottie} />
          </div>
          <div
            className={`card w-full lg:w-1/2 max-w-5xl p-8 ${
              isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            } shadow-md rounded-lg`}
          >
            <div className="text-center mb-6 space-y-2">
              <h2 className={`text-center text-4xl mb-6 space-y-2`}>
                Step Into Your Bright Future
              </h2>
              <p>Log in to EduBridge and access exclusive scholarships.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full rounded-lg"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full rounded-lg"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Must be at least 6 characters" },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Demo User Credentials */}
              <div className="mt-4">
                <p className="text-center font-medium text-lg">Demo User Credentials</p>
                <div className="flex justify-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials("Admin")}
                    className="btn btn-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials("Moderator")}
                    className="btn btn-sm bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  >
                    Moderator
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials("User")}
                    className="btn btn-sm bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    User
                  </button>
                </div>
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
                >
                  Login
                </button>
              </div>

              <div className="text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/register" className="text-blue-500 font-medium underline">
                    Register
                  </Link>
                </p>
              </div>
            </form>

            {/* Social Login */}
            <div className="flex flex-col items-center mt-6">
              <div className="divider text-sm text-gray-500">OR</div>
              <div className="flex justify-center space-x-4">
                <button onClick={handleGoogleLogin} className="btn btn-outline rounded-full">
                  <FaGoogle size={20} />
                </button>
                <button className="btn btn-outline rounded-full">
                  <FaFacebook size={20} />
                </button>
                <button className="btn btn-outline rounded-full">
                  <FaGithub size={20} />
                </button>
                <button className="btn btn-outline rounded-full">
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

export default Login;
