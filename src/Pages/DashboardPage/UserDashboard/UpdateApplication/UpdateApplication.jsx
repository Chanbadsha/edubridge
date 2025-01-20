import { useState } from "react";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import { data, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";

const UpdateApplication = () => {
  const { loading, isDarkMode, updateApplication } = useAuth();

  if (loading) {
    return <Loader />;
  }

  const axiosSecret = useAxiosSecret();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setIsProcessing(true);
    axiosSecret
      .patch(`/updateApplication/${updateApplication._id}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          setIsProcessing(false);
          // reset();
          // navigate("/dashboard/my-application");
        }
      })
      .catch(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-gray-900 text-textBlack"
          : "bg-backgroundLight text-textLight"
      }`}
    >
      <main className="container mx-auto px-4 py-8">
        <form
          className={`max-w-4xl mx-auto p-6 rounded-lg shadow-xl ${
            isDarkMode ? "bg-backgroundBlack" : "bg-gray-100"
          }`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">
            Update Application
          </h2>

          {/* Name */}
          <div className="mb-6">
            <label className="block font-semibold text-lg mb-2">
              Applicant's Name
            </label>
            <input
              type="text"
              placeholder="Name"
              defaultValue={updateApplication?.name}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
              }`}
              {...register("name")}
            />
          </div>

          {/* Phone Number and Gender */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 mb-6">
              <label className="block font-semibold text-lg mb-2">
                Phone Number
              </label>
              <input
                type="text"
                defaultValue={updateApplication?.phoneNumber}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
                }`}
                {...register("phoneNumber")}
              />
            </div>
            <div className="flex-1 mb-6">
              <label className="block font-semibold text-lg mb-2">Gender</label>
              <select
                defaultValue={updateApplication?.gender}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
                }`}
                {...register("gender")}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4 mb-6">
            <label className="block font-semibold text-lg mb-2">Address</label>
            <input
              type="text"
              placeholder="Village"
              defaultValue={updateApplication?.address?.village}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
              }`}
              {...register("address.village")}
            />
            <input
              type="text"
              placeholder="District"
              defaultValue={updateApplication?.address?.district}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
              }`}
              {...register("address.district")}
            />
            <input
              type="text"
              placeholder="Country"
              defaultValue={updateApplication?.address?.country}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
              }`}
              {...register("address.country")}
            />
          </div>

          {/* Degree and Study Gap */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <label className="block font-semibold text-lg mb-2">
                Applying Degree
              </label>
              <select
                defaultValue={updateApplication?.degree}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
                }`}
                {...register("degree")}
              >
                <option value="">Select Degree</option>
                <option value="Masters">Masters</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-semibold text-lg mb-2">
                Study Gap
              </label>
              <select
                defaultValue={updateApplication?.studyGap}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
                }`}
                {...register("studyGap")}
              >
                <option value="">No Gap</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3+ Years">3+ Years</option>
              </select>
            </div>
          </div>

          {/* SSC and HSC Result */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <label className="block font-semibold text-lg mb-2">
                SSC Result
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={updateApplication?.sscResult}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
                }`}
                {...register("sscResult")}
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold text-lg mb-2">
                HSC Result
              </label>
              <input
                type="number"
                step="0.01"
                defaultValue={updateApplication?.hscResult}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? "bg-backgroundBlack text-textBlack" : "bg-white"
                }`}
                {...register("hscResult")}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center mb-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300"
            >
              Update
              {/* {isProcessing ? "Processing..." : "Update Application"} */}
            </button>
            {/* <Link
              to="/dashboard/my-application"
              className="bg-gray-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </Link> */}
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdateApplication;
