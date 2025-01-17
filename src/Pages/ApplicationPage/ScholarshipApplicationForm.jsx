import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loader/Loader";
import useAxiosPublic from "../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import { useParams } from "react-router-dom";
import useAxiosSecret from "../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import toast from "react-hot-toast";

const ScholarshipApplicationForm = () => {
  const { loading, user } = useAuth();
  const { id } = useParams();
  if (loading) {
    return <Loader />;
  }
  const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
  const axiosPublic = useAxiosPublic();
  const axiosSecret = useAxiosSecret();
  const [scholarship, setScholarship] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    axiosPublic
      .get(`/users?email=${user.email}`)
      .then((res) => setUserInfo(res.data));
  }, []);
  useEffect(() => {
    axiosPublic.get(`/scholarships/${id}`).then((res) => {
      setScholarship(res.data);
    });
  }, [id]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { photo, ...applicant_info } = data || {};

    // console.log(photo[0]);
    const imageFile = { image: photo[0] };
    // console.log(imageFile);
    const date = new Date();

    applicant_info.user_name = userInfo.name;
    applicant_info.user_email = userInfo.email;
    applicant_info.user_id = userInfo._id;
    applicant_info.Scholarship_id = scholarship._id;
    applicant_info.application_date = date;

    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    applicant_info.user_img = res.data.data.display_url;
    if (res.data.success) {
      axiosSecret.post("/application", applicant_info).then((res) => {
        console.log(res.data.insertedId);
        if (res.data.insertedId) {
          toast.success("Your application has been successfully submitted!");
        }
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-500 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Scholarship Application
          </h1>
          <p className="text-center mt-2 text-lg">
            Unlock Your Academic Dreams with Our Scholarships
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <form
          className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Application Form
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Applicant's Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded bg-gray-200"
              value={user?.displayName}
              readOnly
            />
          </div>

          <div className="flex flex-col md:flex-row  md:gap-4">
            {/* Phone Number */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Applicant's Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border rounded  focus:ring focus:ring-blue-200"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Applicant's Gender
              </label>
              <select
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
          </div>
          {/* Photo */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Photo</label>
            <input
              type="file"
              className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
              {...register("photo", { required: "Photo is required" })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Applicant's Address
            </label>
            <input
              type="text"
              placeholder="Village"
              className="w-full px-3 py-2 border rounded mb-2 focus:ring focus:ring-blue-200"
              {...register("address.village", {
                required: "Village is required",
              })}
            />
            <input
              type="text"
              placeholder="District"
              className="w-full px-3 py-2 border rounded mb-2 focus:ring focus:ring-blue-200"
              {...register("address.district", {
                required: "District is required",
              })}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
              {...register("address.country", {
                required: "Country is required",
              })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">
                Address fields are required
              </p>
            )}
          </div>

          {/* applying degree */}
          <div className="flex flex-col md:flex-row  md:gap-4">
            {/* Applying Degree */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Applying Degree
              </label>
              <select
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                {...register("degree", { required: "Degree is required" })}
              >
                <option value="">Select Degree</option>
                <option value="Masters">Masters</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Diploma">Diploma</option>
              </select>
              {errors.degree && (
                <p className="text-red-500 text-sm">{errors.degree.message}</p>
              )}
            </div>
            {/* Study Gap */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">Study Gap</label>
              <select
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                {...register("studyGap")}
              >
                <option value="">No Gap</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3+ Years">3+ Years</option>
              </select>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col md:flex-row  md:gap-4">
            {/* SSC Result */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">SSC Result</label>
              <input
                type="text"
                placeholder="Enter SSC result"
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                {...register("sscResult", {
                  required: "SSC Result is required",
                })}
              />
              {errors.sscResult && (
                <p className="text-red-500 text-sm">
                  {errors.sscResult.message}
                </p>
              )}
            </div>

            {/* HSC Result */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">HSC Result</label>
              <input
                type="text"
                placeholder="Enter HSC result"
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                {...register("hscResult", {
                  required: "HSC Result is required",
                })}
              />
              {errors.hscResult && (
                <p className="text-red-500 text-sm">
                  {errors.hscResult.message}
                </p>
              )}
            </div>
          </div>

          {/* Read-Only Fields */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">University Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded bg-gray-200"
              value={`${scholarship.university_name}`}
              readOnly
            />
          </div>
          <div className="flex flex-col md:flex-row  md:gap-4">
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Scholarship Category
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded bg-gray-200"
                value="Full Scholarship"
                readOnly
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Subject Category
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded bg-gray-200"
                value={`${scholarship.subject_name}`}
                readOnly
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:ring focus:ring-blue-200"
          >
            Submit Application
          </button>
        </form>
      </main>
    </div>
  );
};

export default ScholarshipApplicationForm;
