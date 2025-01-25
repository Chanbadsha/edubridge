import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";

import useAuth from "../../../../Hooks/useAuth";

import Loader from "../../../../Components/Loader/Loader";

const UserApplicationFeedback = () => {
  const { loading } = useAuth();
  const { id } = useParams();
  // console.log(id);
  if (loading) {
    return <Loader />;
  }

  const axiosSecret = useAxiosSecret();
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.feedbackComment.value) {
      toast.error("You need to give feedback to submit");
    }
    const feedbackData = {
      feedbackComment: e.target.feedbackComment.value,
    };
    // console.log(feedbackData);
    setIsProcessing(true);

    axiosSecret
      .patch(`/updateApplicationFeedback/${id}`, feedbackData)
      .then((res) => {
        if (res.data) {
          toast.success("Your feedback has been successfully submitted!");
          setIsProcessing(false);
          navigate("/dashboard/shared/manage-application");
        }
      })
      .catch((error) => {
        setIsProcessing(false);
        // console.log(error);
        navigate("/dashboard/shared/manage-application");
        toast.error("Failed to submit your review. Please try again.");
      });
  };

  return (
    <div className="bg-backgroundLight min-h-screen flex justify-center items-center text-textLight">
      <main className="container mx-auto px-4 py-8">
        <form
          className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl"
          onSubmit={onSubmit}
        >
          {/* Title */}
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
            Provide Feedback to Users
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-center text-gray-700 mb-8">
            Help users improve by sharing constructive feedback on their
            scholarship applications.
          </p>

          {/* Feedback Textarea */}
          <div className="mb-6">
            <label
              htmlFor="feedbackComments"
              className="block font-semibold text-lg mb-2 text-gray-800"
            >
              Your Feedback
            </label>
            <textarea
              id="feedbackComments"
              name="feedbackComment"
              rows="6"
              placeholder="Write your feedback here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300"
              disabled={isProcessing}
            >
              {isProcessing ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UserApplicationFeedback;
