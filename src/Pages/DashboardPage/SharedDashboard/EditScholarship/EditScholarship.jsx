import { useEffect, useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import useAxiosPublic from "../../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditScholarship = () => {
  const { loading, isDarkMode } = useAuth();

  const { id } = useParams();
  if (loading) {
    return <Loader />;
  }

  const axiosPublic = useAxiosPublic();
  const axiosSecret = useAxiosSecret();
  const [scholarship, setScholarship] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

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
    const { city, country, ...ScholarshipInfo } = data || {};
    setIsProcessing(true);

    const university_location = {
      city: data?.city,
      country: data?.city || scholarship?.university_location?.city,
    };
    ScholarshipInfo.university_location = university_location;
    // console.log(university_location);
    console.log(ScholarshipInfo);

    axiosSecret
      .patch(`/updateScholarship/${scholarship._id}`, ScholarshipInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Scholarship has been successfully updated!");
          setIsProcessing(false);

          reset();
          navigate("/dashboard/shared/manage-scholarship");
        }
      })
      .catch((error) => {
        setIsProcessing(false);

        toast.error("Application failed, try again");
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

          {/*Scholarship Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Scholarship Name</label>
            <input
              type="text"
              placeholder="Enter Scholarship Name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
              defaultValue={scholarship?.scholarship_name}
              {...register("scholarship_name")}
            />
          </div>

          {/* University Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">University Name</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
              defaultValue={scholarship?.university_name}
              {...register("university_name")}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-4">
            {/* Subject Name */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">Subject Name</label>
              <input
                type="text"
                placeholder="Enter subject name"
                defaultValue={scholarship?.subject_name}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("subject_name")}
              />
            </div>

            {/*  Scholarship Degree */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Scholarship Degree
              </label>
              <select
                defaultValue={scholarship?.scholarship_degree}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("scholarship_degree")}
              >
                <option value="">Select Degree</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Diploma">Diploma</option>
                <option value="Masters">Masters</option>
              </select>
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
                defaultValue={scholarship?.subject_category}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("subject_category")}
              >
                <option value="">Select Subject Category</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>

            {/* Scholarship Category */}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Scholarship Category
              </label>
              <select
                defaultValue={scholarship?.scholarship_category}
                className={`w-full  px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("scholarship_category")}
              >
                <option value="">Select Category</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial fund">Partial fund</option>
                <option value="Self fund">Self-fund</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="mb-4 space-y-2">
            <label className="block font-semibold mb-1">
              University Address
            </label>

            <input
              type="text"
              placeholder="City"
              defaultValue={scholarship?.university_location?.city}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
              {...register("city")}
            />
            <input
              type="text"
              placeholder="Country"
              defaultValue={scholarship?.university_location?.country}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
              {...register("country")}
            />
          </div>

          {/*     Application Deadline And Stipend */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                defaultValue={scholarship?.application_deadline}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("application_deadline")}
              />
            </div>

            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Stipend (If have)
              </label>
              <input
                type="text"
                placeholder="Enter stipend (if have)"
                defaultValue={scholarship?.stipend}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("stipend")}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-4">
            {" "}
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Application Fees ($)
              </label>
              <input
                type="text"
                placeholder="Enter application fees"
                defaultValue={scholarship?.application_fees}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("application_fees")}
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="block font-semibold mb-1">
                Service Charge ($)
              </label>

              <input
                type="text"
                placeholder="Enter service charge"
                defaultValue={scholarship?.service_charge}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-backgroundBlack text-textBlack"
                    : "text-textLight bg-backgroundLight"
                }`}
                {...register("service_charge")}
              />
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
              defaultValue={scholarship?.scholarship_description}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-backgroundBlack text-textBlack"
                  : "text-textLight bg-backgroundLight"
              }`}
              {...register("scholarship_description")}
            />
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
