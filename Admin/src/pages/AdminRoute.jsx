import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slice/userSlice";
import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

export default function OnlyAdminPrivateRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Introduce a loading state
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(setUser({ user: parsedUser, token: storedToken }));
          navigate("/fileUpload");
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      } finally {
        setLoading(false); // Update loading state when user data retrieval is complete
      }
    };
    fetchUser();
  }, [dispatch]);

  // Render loading state if user data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render components based on user authentication
  return user && user.token ? (
    <>
      <div style={{ padding: "0px" }}>
        <div style={{ marginLeft: 280 }}>
          <Topbar />
          <Sidebar />
          <Outlet />
        </div>
      </div>
      
    </>
  ) : (
    <Navigate to="/login" />
  );
}
