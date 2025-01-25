import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaBars,
  FaClipboardList,
  FaHome,
  FaPlusCircle,
  FaUniversity,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdWifiCalling3 } from "react-icons/md";
import { HiOutlineChatAlt2, HiOutlineClipboardList } from "react-icons/hi";
import { BsCardChecklist } from "react-icons/bs";
import { RiChatCheckLine } from "react-icons/ri";
import useAuth from "../../../Hooks/useAuth";
import useUserData from "../../../Hooks/UsersData/useUserData";

const Dashboard = () => {
  const [collapse, setCollapse] = useState(false);
  const { user, isDarkMode } = useAuth();
  const [usersInfo] = useUserData();
  // console.log(usersInfo.role);
  useEffect(() => {
    const updateCollapseState = () => {
      if (window.innerWidth <= 560) {
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    };

    updateCollapseState();

    window.addEventListener("resize", updateCollapseState);

    return () => {
      window.removeEventListener("resize", updateCollapseState);
    };
  }, []);

  const handleCollapse = () => setCollapse(!collapse);

  const [users, setUsers] = useState(true);
  const [moderators, setModerators] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (usersInfo.role === "Admin") {
      setUsers(false);
      return setAdmin(true);
    }
    if (usersInfo.role === "Moderator") {
      setUsers(false);
      return setModerators(true);
    }
    setUsers(true);
  }, [usersInfo]);

  return (
    <div className="min-h-screen  max-w-7xl mx-auto flex">
      {/* Left Section: Sidebar */}
      <div
        className={`bg-gray-900   text-white p-4 py-12 transition-all duration-300 shadow-lg ${
          collapse ? "w-20" : "w-64"
        } hidden md:block`}
      >
        <div
          className={`flex flex-col h-full ${collapse ? "items-center" : ""}`}
        >
          {/* Sidebar Header */}
          <div className="h-36">
            <h2
              className="text-xl font-bold mb-6 cursor-pointer flex items-center gap-2"
              onClick={handleCollapse}
            >
              {collapse ? (
                <FaBars size={28} />
              ) : (
                <span className="flex text-4xl items-center gap-2">
                  <FaBars size={28} /> EduBridge
                </span>
              )}
            </h2>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1">
            <nav className="w-full">
              <ul className="space-y-4">
                {users && (
                  <>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/my-profile"
                        className="flex items-center gap-2"
                      >
                        {collapse ? <FaUser size={28} /> : <FaUser />}
                        {!collapse && <span>My Profile</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/my-application"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <HiOutlineClipboardList size={28} />
                        ) : (
                          <HiOutlineClipboardList />
                        )}
                        {!collapse && <span>My Application</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/my-review"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <HiOutlineChatAlt2 size={28} />
                        ) : (
                          <HiOutlineChatAlt2 />
                        )}
                        {!collapse && <span>My Review</span>}
                      </Link>
                    </li>
                  </>
                )}
                {moderators && (
                  <>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/moderator-profile"
                        className="flex items-center gap-2"
                      >
                        {collapse ? <FaUser size={28} /> : <FaUser />}
                        {!collapse && <span>My Profile</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/shared/manage-scholarship"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <BsCardChecklist size={28} />
                        ) : (
                          <BsCardChecklist />
                        )}
                        {!collapse && <span>Manage Scholarships</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/shared/manage-review"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <RiChatCheckLine size={28} />
                        ) : (
                          <RiChatCheckLine />
                        )}
                        {!collapse && <span>All Reviews</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/shared/manage-application"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <FaClipboardList size={28} />
                        ) : (
                          <FaClipboardList />
                        )}
                        {!collapse && <span>All Applied Scholarship</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/shared/add-scholarship"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <FaPlusCircle size={28} />
                        ) : (
                          <FaPlusCircle />
                        )}
                        {!collapse && <span>Add Scholarship</span>}
                      </Link>
                    </li>
                  </>
                )}
                {admin && (
                  <>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/admin-profile"
                        className="flex items-center gap-2"
                      >
                        {collapse ? <FaUser size={28} /> : <FaUser />}
                        {!collapse && <span>Admin Profile</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/shared/add-scholarship"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <FaPlusCircle size={28} />
                        ) : (
                          <FaPlusCircle />
                        )}
                        {!collapse && <span>Add Scholarship</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/shared/manage-scholarship"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <BsCardChecklist size={28} />
                        ) : (
                          <BsCardChecklist />
                        )}
                        {!collapse && <span>Manage Scholarships</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/shared/manage-application"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <FaClipboardList size={28} />
                        ) : (
                          <FaClipboardList />
                        )}
                        {!collapse && <span>Manage Applied Scholarship</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/admin/manage-user"
                        className="flex items-center gap-2"
                      >
                        {collapse ? <FaUsers size={28} /> : <FaUsers />}
                        {!collapse && <span>Manage Users</span>}
                      </Link>
                    </li>
                    <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                      <Link
                        to="/dashboard/shared/manage-review"
                        className="flex items-center gap-2"
                      >
                        {collapse ? (
                          <HiOutlineChatAlt2 size={28} />
                        ) : (
                          <HiOutlineChatAlt2 />
                        )}
                        {!collapse && <span>Manage Review</span>}
                      </Link>
                    </li>
                  </>
                )}
                <div className="divider bg-white w-full h-[1px]" />
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/" className="flex items-center gap-2">
                    {collapse ? <FaHome size={28} /> : <FaHome />}
                    {!collapse && <span>Home</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/scholarships" className="flex items-center gap-2">
                    {collapse ? <IoSchool size={28} /> : <IoSchool />}
                    {!collapse && <span>Scholarships</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? <FaUniversity size={28} /> : <FaUniversity />}
                    {!collapse && <span>Universities</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? (
                      <BiSolidUserDetail size={28} />
                    ) : (
                      <BiSolidUserDetail />
                    )}
                    {!collapse && <span>About Us</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? (
                      <MdWifiCalling3 size={28} />
                    ) : (
                      <MdWifiCalling3 />
                    )}
                    {!collapse && <span>Contact Us</span>}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div
        className={`md:hidden sticky -top-20 left-0 bg-gray-900 text-white p-4 transition-all duration-300 shadow-l ${
          collapse ? "w-20" : "w-44"
        }`}
      >
        <span
          onClick={handleCollapse}
          className={`flex py-4 text-xl font-bold mb-6 cursor-pointer items-center gap-2 ${
            !collapse ? "" : "justify-center items-center"
          }`}
        >
          {collapse ? (
            <FaBars size={28} />
          ) : (
            <>
              <FaBars size={28} /> EduBridge
            </>
          )}
        </span>

        <nav className="w-full">
          <ul className="space-y-4">
            {users && (
              <>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link
                    to="/dashboard/my-profile"
                    className="flex items-center gap-2"
                  >
                    {collapse ? <FaUser size={28} /> : <FaUser />}
                    {!collapse && <span>My Profile</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link
                    to="/dashboard/my-application"
                    className="flex items-center gap-2"
                  >
                    {collapse ? (
                      <HiOutlineClipboardList size={28} />
                    ) : (
                      <HiOutlineClipboardList />
                    )}
                    {!collapse && <span>My Application</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link
                    to="/dashboard/my-review"
                    className="flex items-center gap-2"
                  >
                    {collapse ? (
                      <HiOutlineChatAlt2 size={28} />
                    ) : (
                      <HiOutlineChatAlt2 />
                    )}
                    {!collapse && <span>My Review</span>}
                  </Link>
                </li>
              </>
            )}
            {moderators && (
              <>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link
                    to="/dashboard/moderator-profile"
                    className="flex items-center gap-2"
                  >
                    {collapse ? <FaUser size={28} /> : <FaUser />}
                    {!collapse && <span>My Profile</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? (
                      <BsCardChecklist size={28} />
                    ) : (
                      <BsCardChecklist />
                    )}
                    {!collapse && <span>Manage Scholarships</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? (
                      <RiChatCheckLine size={28} />
                    ) : (
                      <RiChatCheckLine />
                    )}
                    {!collapse && <span>All Reviews</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? (
                      <FaClipboardList size={28} />
                    ) : (
                      <FaClipboardList />
                    )}
                    {!collapse && <span>All Applied Scholarship</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? <FaPlusCircle size={28} /> : <FaPlusCircle />}
                    {!collapse && <span>Add Scholarship</span>}
                  </Link>
                </li>
              </>
            )}
            {admin && (
              <>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link
                    to="/dashboard/admin-profile"
                    className="flex items-center gap-2"
                  >
                    {collapse ? <FaUser size={28} /> : <FaUser />}
                    {!collapse && <span>Admin Profile</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? <FaPlusCircle size={28} /> : <FaPlusCircle />}
                    {!collapse && <span>Add Scholarship</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? (
                      <BsCardChecklist size={28} />
                    ) : (
                      <BsCardChecklist />
                    )}
                    {!collapse && <span>Manage Scholarships</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? (
                      <FaClipboardList size={28} />
                    ) : (
                      <FaClipboardList />
                    )}
                    {!collapse && <span>Manage Applied Scholarship</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    {collapse ? <FaUsers size={28} /> : <FaUsers />}
                    {!collapse && <span>Manage Users</span>}
                  </Link>
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 transition">
                  <Link
                    to="/dashboard/shared/manage-review"
                    className="flex items-center gap-2"
                  >
                    {collapse ? (
                      <HiOutlineChatAlt2 size={28} />
                    ) : (
                      <HiOutlineChatAlt2 />
                    )}
                    {!collapse && <span>Manage Review</span>}
                  </Link>
                </li>
              </>
            )}
            <div className="divider bg-white w-full h-[1px]" />
            <li className="hover:bg-gray-700 rounded-lg p-2 transition">
              <Link to="/" className="flex items-center gap-2">
                {collapse ? <FaHome size={28} /> : <FaHome />}
                {!collapse && <span>Home</span>}
              </Link>
            </li>
            <li className="hover:bg-gray-700 rounded-lg p-2 transition">
              <Link to="/scholarships" className="flex items-center gap-2">
                {collapse ? <IoSchool size={28} /> : <IoSchool />}
                {!collapse && <span>Scholarships</span>}
              </Link>
            </li>
            <li className="hover:bg-gray-700 rounded-lg p-2 transition">
              <Link to="/dashboard" className="flex items-center gap-2">
                {collapse ? <FaUniversity size={28} /> : <FaUniversity />}
                {!collapse && <span>Universities</span>}
              </Link>
            </li>
            <li className="hover:bg-gray-700 rounded-lg p-2 transition">
              <Link to="/dashboard" className="flex items-center gap-2">
                {collapse ? (
                  <BiSolidUserDetail size={28} />
                ) : (
                  <BiSolidUserDetail />
                )}
                {!collapse && <span>About Us</span>}
              </Link>
            </li>
            <li className="hover:bg-gray-700 rounded-lg p-2 transition">
              <Link to="/dashboard" className="flex items-center gap-2">
                {collapse ? <MdWifiCalling3 size={28} /> : <MdWifiCalling3 />}
                {!collapse && <span>Contact Us</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right Section: Main Content */}
      <div className={`flex-1  bg-gray-100`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
