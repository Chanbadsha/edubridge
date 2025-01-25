import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import AllApplicationList from "../../../../Hooks/ApplicationInfo/AllApplicationList";
import DisplayUserApplication from "./DisplayUserApplication";
const ManageUserApplication = () => {
  const [getAllApplication, isLoading, refetch] = AllApplicationList();
  // console.log(getAllApplication);
  return (
    <div>
      {/* Header Section  */}
      <DashboardHeader
        title="User Applications Management"
        subtitle="View, edit, reject, and provide feedback on user scholarship applications. Seamlessly manage applications with ease"
      ></DashboardHeader>
      {/* Table Section */}
      <div className="overflow-x-auto mt-6">
        {getAllApplication && getAllApplication.length > 0 ? (
          <table className="table w-full border border-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th>No.</th>
                <th>Scholarship Name</th>

                <th>Applicant's Email</th>
                <th>Status</th>
                <th>Reveiw</th>
                <th>Details</th>
                <th>Feedback</th>
                <th>Cancel</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {getAllApplication.map((applicationInfo, index) => (
                <DisplayUserApplication
                  key={applicationInfo._id || index}
                  applicationInfo={applicationInfo}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-10 text-gray-500">
            No applications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUserApplication;
