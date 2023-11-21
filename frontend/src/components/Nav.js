import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "../images/google.png";

import "./styles/Nav.scss";

export const Nav = () => {
  const navigate = useNavigate();

  const [menuOpen, setOpenMenu] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    leve: "",
    avatar: "",
  });

  useEffect(() => {
    getUserFromStorage();
    return () => {};
  }, []);

  const getUserFromStorage = () => {
    setUser({
      name: sessionStorage.getItem("name"),
      email: sessionStorage.getItem("email"),
      level: sessionStorage.getItem("level"),
      avatar: sessionStorage.getItem("avatar"),
    });
  };

  const logOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleShowInfo = () => {
    Swal.fire({
      title: `Hey, <b>${user.name}!</b>`,
      confirmButtonColor: "#ff2b4e",
      confirmButtonText: "Close",
      html: `<p id="profile-email" style="margin:.4rem">email <b>${user.email}</b></p>
      <div style="display: flex;align-items: center;flex-direction: column;">
      <div class="first" style="display:flex; align-items: center;">
      <div style="width:2.4rem;height:1rem;background:#10f014;border-radius:20px"></div>
      <p style="margin:.3rem">Master level <b>${user.level}</b></p></div>
      <div class="first" style="display:flex; align-items: center;">
      <div style="width:1.2rem;height:1rem;background:#f010e8;border-radius:20px"></div>
      <p style="margin:.3rem"><b>Google Trends</b></p></div>
      <div class="first" style="display:flex; align-items: center;">
      <div style="width:2rem;height:1rem;background:#f0a210;border-radius:20px"></div>
      <p style="margin:.3rem">Team <b>Rocket</b></p></div></div>
      </div>`,
      imageUrl: user.avatar,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "image",
      backdrop: `rgba(0, 0, 0, 0.8)`,
    });
  };

  return (
    <div>
      <nav className="navbar bg-gray-300 py-3 shadow-md">
        <div className="flex justify-between mx-6">
          <div className="flex w-50">
            <img
              className="logo"
              src={logo}
              alt="icon"
              style={{ width: "2rem" }}
            />
            <p className="my-auto ml-4 font-bold text-xl">Google Trends</p>
          </div>
          <div className="flex self-center">
            {/* User Menu */}
            <div className="flex">
              <p className="my-auto mr-2 font-bold text-xl">{user.name}</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${user.avatar})`,
              }}></div>
            <button
              onClick={() => setOpenMenu(!menuOpen)}
              className="navbar__btn my-auto">
              <img className="navbar__img" src={user.avatar} alt="" />
            </button>
            {menuOpen && (
              <div className="navbar__menu">
                <div className="self-center">
                  <button
                    id="profile-btn"
                    onClick={handleShowInfo}
                    className="own-btn h-auto mb-3 w-full">
                    Profile
                  </button>
                </div>
                <div className="self-center">
                  <button
                    className="own-btn own-btn__logout h-auto w-full"
                    onClick={logOut}>
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
