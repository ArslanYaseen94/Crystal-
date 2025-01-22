import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import Banner from "/image/lake-ge1c8d281d_1920.jpg";
import "../Homestyle.css";
import { useEffect } from "react";
export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/home/menu");
    }, 5000);
  });
  return (
    <div className="home" style={{ backgroundImage: `url(${Banner})` }}>
      <div className="headercontainer">
        <h1>Crystal</h1>
        <p>Best Cosmetics Product In Pakistan</p>
        <NavLink to={"/home/menu"}>
          <button>Go To Menu Page</button>
        </NavLink>
      </div>
    </div>
  );
};
