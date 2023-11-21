import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import Nav from "../components/Nav";
import Card from "../components/Card";

//styles
import "../index.scss";
import "./styles/Dashboard.scss";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [trendsList, setTrendsList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Default trends data in case of API failure
  const defaultTrends = [
    { name: "Jimmy Carter", searchVolume: "High", region: "Global" },
    { name: "Vikings", searchVolume: "High", region: "Global" },
  ];

  useEffect(() => {
    validateToken();
  }, [navigate]);

  useEffect(() => {
    fetchTrendsData(page);
    handlePageChange(page);
    return () => {};
  }, [page]);

  const validateToken = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };

  const fetchTrendsData = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`TRENDS_ENDPOINT?page=${page}`);
      const trendsData = res.data;
      setTrendsList(trendsData);
    } catch (error) {
      console.error(error);
      // Fallback to default trends data
      setTrendsList(defaultTrends);
    } finally {
      setLoading(false);
    }
  };

  const cleanActivePageButton = () => {
    let activeBtn = document.querySelector(".btn-pag__active");
    if (activeBtn) {
      activeBtn.classList.remove("btn-pag__active");
    }
  };

  const handlePageChange = (newPage) => {
    cleanActivePageButton();
    let btnToActive = document.querySelector(".pagination").childNodes[newPage - 1];
    if (btnToActive) {
      btnToActive.classList.add("btn-pag__active");
    }
    setPage(newPage);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="dashboard">
      <Nav />
      <div className="cards flex flex-wrap m-auto p-6 justify-center">
        {loading ? (
          <Loader />
        ) : (
          trendsList.map((trend, index) => (
            <Card
              key={index}
              name={trend.name}
              searchVolume={trend.searchVolume}
              region={trend.region}
            />
          ))
        )}

        {/* Pagination */}
        <div className="pagination flex w-full h-8 justify-center">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              className={`btn-pag ${page === num ? 'btn-pag__active' : ''}`}
              onClick={() => handlePageChange(num)}>
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
