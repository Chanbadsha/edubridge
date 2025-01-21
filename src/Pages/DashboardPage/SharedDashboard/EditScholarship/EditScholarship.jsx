import { useEffect, useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import useAxiosPublic from "../../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditScholarship = () => {
  const { loading, user, isDarkMode } = useAuth();

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
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

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
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { photo, ...applicant_info } = data || {};
    setIsProcessing(true);
    const imageFile = { image: photo[0] };
    const date = new Date();
    applicant_info.student_name = applicant_info.user_name = userInfo.name;
    applicant_info.user_email = userInfo.email;
    applicant_info.user_id = userInfo._id;
    applicant_info.Scholarship_id = scholarship._id;
    applicant_info.application_date = date;
    applicant_info.Scholarship_info = scholarship;
    applicant_info.application_status = "pending";

    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    applicant_info.user_img = res.data.data.display_url;
    if (res.data.success) {
      axiosSecret
        .post("/application", applicant_info)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Your application has been successfully submitted!");
            setIsProcessing(false);
            reset();
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setIsProcessing(false);

            return toast.error(error.response.data.message);
          }
          setIsProcessing(false);
          toast.error("Application failed, try again");
        });
    }
  };

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-gray-900 text-textBlack"
          : "bg-backgroundLight text-textLight"
      }`}
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
            Scholarship Edit Form
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">University Name</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
              //   defaultValue={scholarship?.university_name}
              {...register("university_name")}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-4">
            {/* Phone Number */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="Enter Schloarship Category"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("scholarship_category")}
              />
            </div>

            {/* Gender */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Scholarship Category
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("scholarship_category")}
              >
                <option value="">Select Category</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Diploma">Diploma</option>
                <option value="Masters">Masters</option>
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
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              {...register("photo", { required: "Photo is required" })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4 space-y-2">
            <label className="block font-semibold mb-1">
              University Address
            </label>
            <input
              type="text"
              placeholder="Country"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
              {...register("university_location.country")}
            />
            <input
              type="text"
              placeholder="Ciy"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
              {...register("address.district")}
            />
            <input
              type="text"
              placeholder="Country"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
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

          {/* Degree and Study Gap */}
          {/* <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Applying Degree
              </label>
              <select
                className={`w-full  px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
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
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">Study Gap</label>
              <select
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("studyGap")}
              >
                <option value="">No Gap</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3+ Years">3+ Years</option>
              </select>
            </div>
          </div> */}

          {/* SSC and HSC Result */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">SSC Result</label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter SSC result"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("sscResult", {
                  required: "SSC Result is required",
                  min: {
                    value: 0,
                    message: "SSC Result cannot be less than 0",
                  },
                  max: {
                    value: 5,
                    message: "SSC Result cannot be greater than 5",
                  },
                })}
              />
              {errors.sscResult && (
                <p className="text-red-500 text-sm">
                  {errors.sscResult.message}
                </p>
              )}
            </div>

            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">HSC Result</label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter HSC result"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("hscResult", {
                  required: "HSC Result is required",
                  min: {
                    value: 0,
                    message: "HSC Result cannot be less than 0",
                  },
                  max: {
                    value: 5,
                    message: "HSC Result cannot be greater than 5",
                  },
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
          <div className="flex flex-col md:flex-row md:gap-4">
            {" "}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                University Name
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                value={`${scholarship.university_name}`}
                readOnly
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Subject Category
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                value={`${scholarship.subject_name}`}
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Scholarship Category
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                value="Full Scholarship"
                readOnly
              />
            </div>

            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">Eligibility</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                value="Eligible students with excellent academic records"
                readOnly
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg transform transition-all duration-300 hover:bg-blue-600"
            >
              {isProcessing ? "Processing" : "Edit Scholarship"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditScholarship;
