import React, { useEffect, useState } from "react";
import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecret from "../../../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import ReviewDisplay from "./ReviewDisplay";
import { useQuery } from "@tanstack/react-query";

const UserReview = () => {
  const { user, loading } = useAuth();
  const axiosSecret = useAxiosSecret();


  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allReview", user.email],
    queryFn: async () => {
      const response = await axiosSecret.get(`/getReview?email=${user.email}`);
      return response.data;
    },
  });

  return (
    <div>
      <DashboardHeader
        title="Manage Your Reviews"
        subtitle="Review and edit your past submissions, and see how your feedback helps improve the EduBridge experience."
      ></DashboardHeader>

      {/* Table Section */}
      <div className="overflow-x-auto mt-6">
        {reviews && reviews.length > 0 ? (
          <table className="table w-full border border-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th>No.</th>
                <th>University Name</th>
                <th>Scholarship Degree</th>

                <th>Review comments</th>
                <th>Review Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {reviews?.map((review, index) => (
                <ReviewDisplay
                  reviewInfo={review}
                  index={index}
                  key={index}
                  refetch={refetch}
                ></ReviewDisplay>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-10 text-gray-500">
            No reviews found. Start applying to scholarships now!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReview;
