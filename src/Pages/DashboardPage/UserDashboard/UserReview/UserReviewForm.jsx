import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import Loader from "../../../../Components/Loader/Loader";
import useAuth from "../../../../Hooks/useAuth";
import StarRatings from "react-star-ratings";

const UserReviewForm = () => {
  const { loading, isDarkMode, user, updateApplication } = useAuth();

  if (loading || !updateApplication) {
    return <Loader />;
  }

  const axiosSecret = useAxiosSecret();
  const [isProcessing, setIsProcessing] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const currentDate = new Date().toISOString().split("T")[0];

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please provide a rating before submitting!");
      return;
    }

    const formData = new FormData(e.target);
    const reviewComment = formData.get("reviewComment");
    if (!reviewComment) {
      return toast.error("Please provide comment before submitting!");
    }
    const reviewData = {
      reviewer: user?.displayName,
      email: user?.email,
      subject_category: updateApplication?.Scholarship_info?.subject_category,
      scholarship_name: updateApplication?.Scholarship_info?.scholarship_name,
      university_name: updateApplication?.Scholarship_info?.university_name,
      photo: user?.photoURL || "https://i.ibb.co.com/dpsR23y/profile.png",
      review_scholarship_id: updateApplication?.Scholarship_id,
      rating,
      reviewComment,
      reviewDate: currentDate,
    };

    setIsProcessing(true);

    // console.log(reviewData);
    axiosSecret
      .post(`/addReview`, reviewData)
      .then((res) => {
        if (res.data) {
          toast.success("Your review has been successfully submitted!");
          setIsProcessing(false);
          navigate("/dashboard/my-review");
        }
      })
      .catch((error) => {
        setIsProcessing(false);

        if (error.response.status === 409) {
          navigate("/dashboard/my-review");
          return toast.error(error.response.data.message);
        }
        navigate("/dashboard/my-review");
        toast.error("Failed to submit your review. Please try again.");
      });
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div
      className={`"bg-backgroundLight min-h-screen flex justify-center items-center text-textLight"
      `}
    >
      <main className="container    mx-auto px-4 py-8">
        <form
          className={`max-w-3xl mx-auto p-6 rounded-lg shadow-xl "bg-gray-100"
          `}
          onSubmit={onSubmit}
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-500">
            Share Your Experience
          </h2>
          <p className="text-lg text-center text-gray-600 mb-8">
            Your feedback matters! Rate your experience and leave a comment to
            help us improve and guide others.
          </p>

          {/* Rating */}
          <div className="mb-6">
            <label className="block font-semibold text-lg mb-2">Rating</label>
            <div className="flex justify-center">
              <StarRatings
                rating={rating}
                starRatedColor="gold"
                changeRating={handleRating}
                numberOfStars={5}
                name="rating"
              />
            </div>
          </div>

          {/* Review Comment */}
          <div className="mb-6">
            <label className="block font-semibold text-lg mb-2">
              Review Comment
            </label>
            <textarea
              name="reviewComment"
              rows="4"
              placeholder="Write your review here..."
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"bg-white"
              `}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300"
              disabled={isProcessing}
            >
              {isProcessing ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UserReviewForm;
