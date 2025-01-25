import { useNavigate } from "react-router-dom";
import Loader from "../../../../Components/Loader/Loader";
import useAxiosPublic from "../../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";

import useAuth from "../../../../Hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddScholarship = () => {
  const { loading, user, isDarkMode } = useAuth();

  if (loading) {
    return <Loader />;
  }
  const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
  const axiosPublic = useAxiosPublic();
  const axiosSecret = useAxiosSecret();
  // console.log(user);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { university_img, city, country, ...ScholarshipInfo } = data || {};
    setIsProcessing(true);
    const imageFile = { image: university_img[0] };

    const university_location = {
      city,
      country,
    };

    const posted_user_info = {
      posted_user_name: user?.displayName,
      posted_user_email: user?.email,
      posted_user_photo: user?.photoURL,
    };
    ScholarshipInfo.university_location = university_location;
    ScholarshipInfo.posted_user_info = posted_user_info;
    ScholarshipInfo.rating = 5;
    ScholarshipInfo.university_logo =
      "https://i.ibb.co.com/cvBjQzM/university-Logo.jpg";

    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    ScholarshipInfo.university_img = res.data.data.display_url;

    if (res.data.success) {
      axiosSecret
        .post("/addScholarship", ScholarshipInfo)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Your scholarship has been successfully add!");
            setIsProcessing(false);
            reset();
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setIsProcessing(false);
            console.log(error);
            return toast.error(error.response.data.message);
          }
          setIsProcessing(false);
          toast.error("Scholarship add failed, try again");
          console.log(error);
        });
    }
  };

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-gray-900 text-textBlack"
          : "bg-backgroundLight text-textLight"
      } flex justify-center items-center min-h-screen`}
    >
      {/* Main Content */}
      <main className={`container mx-auto px-4 py-8`}>
        <form
          className={`max-w-4xl mx-auto p-6 rounded-lg  shadow-2xl ${
            isDarkMode ? "bg-backgroundBlack" : "bg-gray-100"
          }`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
            Scholarship Add Form
          </h2>

          {/* Scholarship Name and University name */}
          <div className="flex flex-col md:flex-row md:gap-4">
            {/*Scholarship Name */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Scholarship Name
              </label>
              <input
                type="text"
                placeholder="Enter scholarship name"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("scholarship_name", {
                  required: "Scholarship name is required",
                })}
              />
              {errors.scholarship_name && (
                <p className="text-red-500 text-sm">
                  {errors.scholarship_name.message}
                </p>
              )}
            </div>
            {/*University Name */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                University Name
              </label>
              <input
                type="text"
                placeholder="Enter university name"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("university_name", {
                  required: "University name is required",
                })}
              />

              {errors.university_name && (
                <p className="text-red-500 text-sm">
                  {errors.university_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Subject Name And Subject Category */}
          <div className="flex flex-col md:flex-row md:gap-4">
            {/* Subject Name */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">Subject Name</label>
              <input
                type="text"
                placeholder="Enter subject name"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("subject_name", {
                  required: "Subject name is required",
                })}
              />
              {errors.subject_name && (
                <p className="text-red-500 text-sm">
                  {errors.subject_name.message}
                </p>
              )}
            </div>

            {/*  Scholarship Degree */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Scholarship Degree
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("scholarship_degree", {
                  required: "Scholarship degree is required",
                })}
              >
                <option value="">Select Degree</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Diploma">Diploma</option>
                <option value="Masters">Masters</option>
              </select>
              {errors.scholarship_degree && (
                <p className="text-red-500 text-sm">
                  {errors.scholarship_degree.message}
                </p>
              )}
            </div>
          </div>

          {/* Scholarship And Subject Category */}

          <div className="flex flex-col md:flex-row md:gap-4">
            {/* subject_category */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Subject Category
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("subject_category", {
                  required: "Subject category is required",
                })}
              >
                <option value="">Select Subject Category</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
                <option value="Agriculture">Agriculture</option>
              </select>
              {errors.subject_category && (
                <p className="text-red-500 text-sm">
                  {errors.subject_category.message}
                </p>
              )}
            </div>

            {/* Scholarship Category */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Scholarship Category
              </label>
              <select
                className={`w-full  px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("scholarship_category", {
                  required: "Scholarship category is required",
                })}
              >
                <option value="">Select Category</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial fund">Partial fund</option>
                <option value="Self fund">Self-fund</option>
              </select>
              {errors.scholarship_category && (
                <p className="text-red-500 text-sm">
                  {errors.scholarship_category.message}
                </p>
              )}
            </div>
          </div>

          {/* Photo */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Choose Photo</label>
            <input
              type="file"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              {...register("university_img", {
                required: "A photo is required",
              })}
            />
            {errors.university_img && (
              <p className="text-red-500 text-sm">
                {errors.university_img.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4 space-y-2">
            <label className="block font-semibold mb-1">
              University Address
            </label>
            <div className="flex md:flex-row flex-col gap-4">
              <div className="flex flex-col flex-1 w-full">
                <input
                  type="text"
                  placeholder="City"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-backgroundBlack text-textBlack"
                      : "text-textLight bg-backgroundLight"
                  }`}
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div className="flex flex-col flex-1">
                <input
                  type="text"
                  placeholder="Country"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-backgroundBlack text-textBlack"
                      : "text-textLight bg-backgroundLight"
                  }`}
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/*     Application Deadline And And Post Date */}
          <div className="flex flex-col md:flex-row md:gap-4">
            {/* Scholarship Post Date */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Application Post Date
              </label>
              <input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("scholarship_post_date", {
                  required: "Scholarship post date is required",
                })}
              />
              {errors.scholarship_post_date && (
                <p className="text-red-500 text-sm">
                  {errors.scholarship_post_date.message}
                </p>
              )}
            </div>

            {/* Application Deadline */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("application_deadline", {
                  required: "Application deadline is required",
                })}
              />
              {errors.application_deadline && (
                <p className="text-red-500 text-sm">
                  {errors.application_deadline.message}
                </p>
              )}
            </div>
          </div>
          {/* Tuition Fees , world rank And Stipend */}
          <div className="flex flex-col lg:flex-row md:gap-4">
            {/*University Rank */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                University World Rank
              </label>
              <input
                type="number"
                placeholder="Enter university world rank"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("university_world_rank", {
                  required: "University rank is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || "Rank must be greater than zero",
                })}
              />
              {errors.university_world_rank && (
                <p className="text-red-500 text-sm">
                  {errors.university_world_rank.message}
                </p>
              )}
            </div>

            {/* Tuition Fees */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Tuition Fees ($)
              </label>
              <input
                type="number"
                placeholder="Enter tuition fees in USD"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("tuition_fees")}
              />
            </div>

            {/* Stipend */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Stipend (If have)
              </label>
              <input
                type="number"
                placeholder="Enter tuition fees in USD"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("stipend")}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            {/* Application Fees */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Application Fees ($)
              </label>
              <input
                type="number"
                placeholder="Enter tuition fees in USD"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("application_fees", {
                  required: "Application fees is required",
                })}
              />
              {errors.application_fees && (
                <p className="text-red-500 text-sm">
                  {errors.application_fees.message}
                </p>
              )}
            </div>

            {/* service_charge */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">Service Charge</label>
              <input
                type="number"
                placeholder="Enter tuition fees in USD"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("service_charge", {
                  required: "Service charge is required",
                })}
              />
              {errors.service_charge && (
                <p className="text-red-500 text-sm">
                  {errors.service_charge.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4 flex-1">
            <label className="block font-semibold mb-1">
              Scholarship Description
            </label>
            <textarea
              type="text"
              rows={8}
              placeholder="Enter scholarship description"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
              {...register("scholarship_description", {
                required: "Scholarship description is required",
                minLength: {
                  value: 500,
                  message: "Minimum description length is 100 words",
                },
              })}
            />

            {errors.scholarship_description && (
              <p className="text-red-500 text-sm">
                {errors.scholarship_description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg transform transition-all duration-300 hover:bg-blue-600"
            >
              {isProcessing ? "Processing" : "Add Scholarship"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddScholarship;
