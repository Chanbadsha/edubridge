import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import StarRatings from "react-star-ratings";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Components/Loader/Loader";

const UserReviewEditForm = () => {
  const { loading, isDarkMode, user } = useAuth();
  const { id } = useParams();

  const axiosSecret = useAxiosSecret();
  const [isProcessing, setIsProcessing] = useState(false);
  const [rating, setRating] = useState(4);
  const navigate = useNavigate();

  const { data: review = {}, isLoading } = useQuery({
    queryKey: ["review", user.email],
    queryFn: async () => {
      const res = await axiosSecret.get(`/getReview/${id}`);

      return res.data;
    },
  });

  if (loading || isLoading) {
    return <Loader />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const reviewComment = formData.get("reviewComment");

    const reviewData = {
      rating: rating || review?.rating,
      reviewComment: reviewComment || review?.reviewComment,
    };

    setIsProcessing(true);

    // console.log(reviewData);
    axiosSecret
      .patch(`/updateReview/${id}`, reviewData)
      .then((res) => {
        if (res.data) {
          toast.success("Your review has been successfully updated!");
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
        toast.error("Failed to update your review. Please try again.");
      });
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div
      className={`
       "bg-backgroundLight min-h-screen flex justify-center items-center text-textLight"
      `}
    >
      <main className="container mx-auto px-4 py-8">
        <form
          className={`max-w-3xl mx-auto p-6 rounded-lg shadow-xl bg-gray-100`}
          onSubmit={onSubmit}
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-500">
            Update Your Feedback
          </h2>
          <p className="text-lg text-center text-gray-600 mb-8">
            Enhance your previous review by updating your rating and comments.
            Your opinion helps us improve and guide others!
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
              defaultValue={review?.reviewComment}
              placeholder="Write your review here..."
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300"
              disabled={isProcessing}
            >
              {isProcessing ? "Submitting..." : "Update Review"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UserReviewEditForm;
