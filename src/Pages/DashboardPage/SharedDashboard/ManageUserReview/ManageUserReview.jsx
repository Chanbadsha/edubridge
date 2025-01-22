import useAllReview from "../../../../Hooks/ReviewInfo/useAllReview/useAllReview";
import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import DisplayUserReview from "./DisplayUserReview";
const ManageUserReview = () => {
  const [AllReview, isLoading, refetch] = useAllReview();
  return (
    <div>
      {/* Section Header */}
      <div>
        <DashboardHeader
          title="User Feedback Control"
          subtitle="Monitor, approve, and resolve user reviews to enhance platform reliability."
        ></DashboardHeader>
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto mt-6">
        {AllReview && AllReview.length > 0 ? (
          <table className="table w-full border border-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th>No.</th>
                <th>Reviewer Photo</th>
                <th>Reviewer Name</th>
                <th>University Name</th>
                <th>Subject Category</th>
                <th>Review Date</th>
                <th>Reviewer Comments</th>
                <th>Rating Point</th>

                <th>Delete</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {AllReview.map((review, index) => (
                <DisplayUserReview
                  key={review._id || index}
                  review={review}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-10 text-gray-500">
            No review found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUserReview;
