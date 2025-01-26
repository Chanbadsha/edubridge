import { useState } from "react";
import logo from "../../assets/Logo/logo.jpeg";
import logoAvatar from "../../assets/Logo/profile.png";
import useAuth from "../../Hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useUserData from "../../Hooks/UsersData/useUserData";
import Loader from "../../Components/Loader/Loader";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const HeaderNav = () => {
  // State for dark mode
  const { isDarkMode, setIsDarkMode, user, userLogOut, loading } = useAuth();
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle between light/dark mode
  };
  if (loading) {
    return <Loader />;
  }

  const [usersInfo] = useUserData();

  const NavLinkStyles = isDarkMode
    ? "text-textBlack font-bold hover:text-accentLight text-[17px]  bg-backgroundBlack"
    : "text-textLight font-bold hover:text-accentLight hover:bg-transparent text-[17px] bg-backgroundLight";

  const navOptions = (
    <>
      <li className="list-none">
        <NavLink to="/" className={`  ${NavLinkStyles}`}>
          Home
        </NavLink>
      </li>

      <li className="list-none">
        <NavLink to="/scholarships" className={` ${NavLinkStyles}`}>
          Scholarships
        </NavLink>
      </li>
      {user && (
        <li className="list-none">
          <NavLink
            to={`/dashboard/${
              usersInfo?.role === "Moderator"
                ? "moderator-profile"
                : `${
                    usersInfo?.role === "Admin" ? "admin-profile" : "my-profile"
                  }`
            }`}
            className={`${NavLinkStyles}`}
          >
            Dashboard
          </NavLink>
        </li>
      )}

      <li className="list-none">
        <NavLink to="/about" className={`${NavLinkStyles}`}>
          About Us
        </NavLink>
      </li>

      <li className="list-none">
        <NavLink to="/contact" className={`${NavLinkStyles}`}>
          Contact Us
        </NavLink>
      </li>
    </>
  );

  // Handle Log Out
  const handleLogOut = () => {
    userLogOut().then(() => {
      toast.success("Successfully Log Out");
      // Swal.fire({
      //   position: "top-center",
      //   icon: "success",
      //   title: "Successfully Log Out",
      //   showConfirmButton: false,
      //   timer: 2500,
      // });
    });
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 shadow-sm bg-${
        isDarkMode ? "backgroundBlack" : "backgroundLight"
      } text-${isDarkMode ? "textBlack" : "textLight"}`}
    >
      <Helmet>
        <title>Edubrige || Home</title>
      </Helmet>
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu space-x-2 menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost px-2 py-2 h-auto text-xl">
            <div className="flex justify-center items-center gap-2">
              <img
                className="w-12 hidden md:block rounded-full h-12"
                src={logo}
                alt="EduBridge"
              />
              <h1
                className={`md:text-3xl text-2xl  ${
                  isDarkMode ? "text-textBlack" : "text-textLight"
                }`}
              >
                EduBridge
              </h1>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2 px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end space-x-4 items-center">
          {/* Theme Controller */}
          <div className="">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                checked={isDarkMode}
                onChange={toggleTheme}
              />

              {/* sun icon */}
              <svg
                className="swap-off h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>

          {/* Button */}
          <div>
            {user ? (
              <>
                <details
                  className={` dropdown dropdown-end  ${
                    isDarkMode
                      ? "bg-backgroundBlack text-textBlack"
                      : "bg-backgroundLight text-textLight"
                  }`}
                >
                  <summary
                    className={` btn px-0 py-0 rounded-full m-1 font-bold  ${
                      isDarkMode
                        ? "bg-backgroundBlack hover:bg-accentBlack text-textBlack"
                        : "bg-backgroundLight text-textLight"
                    }`}
                  >
                    <img
                      className="rounded-full h-12 w-12"
                      src={user?.photoURL || logoAvatar}
                      alt={user?.displayName}
                    />
                  </summary>
                  <ul
                    className={`menu dropdown-content  rounded-box z-[1] w-52 p-2 shadow ${
                      isDarkMode
                        ? "bg-backgroundBlack text-textBlack"
                        : "bg-backgroundLight text-textLight"
                    }`}
                  >
                    <li>
                      <Link
                        to={`/dashboard/${
                          usersInfo?.role === "Moderator"
                            ? "moderator-profile"
                            : `${
                                usersInfo?.role === "Admin"
                                  ? "admin-profile"
                                  : "my-profile"
                              }`
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <a onClick={handleLogOut}>Logout</a>
                    </li>
                  </ul>
                </details>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to="/login"
                  className={`btn btn-outline ${
                    isDarkMode
                      ? "bg-backgroundBlack text-textBlack"
                      : "bg-backgroundLight text-textLight"
                  }`}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
