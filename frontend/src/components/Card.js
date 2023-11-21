import React from "react";
import Swal from "sweetalert2";

//styles
import "./styles/Card.scss";

export const Card = (trend) => {
  const showTrendInfo = (name, searchVolume, relatedQueries, region) => {
    Swal.fire({
      title: `<b>${name}</b>`,
      confirmButtonColor: "#ff2b4e",
      confirmButtonText: "Close",
      html: `<div style="display: flex;align-items: center;flex-direction: column;">
          <p style="margin:.3rem">Search Volume: <b>${searchVolume}</b></p>
          <p style="margin:.3rem">Region: <b>${region}</b></p>
          </div>`,
      backdrop: `rgba(0, 0, 0, 0.8)`,
    });
  };

  return (
    <div
      className="card w-full md:w-2/4 lg:w-1/3 mx-2 h-96 bg-gray-300"
      onClick={() =>
        showTrendInfo(
          trend.name,
          trend.searchVolume,
          trend.relatedQueries,
          trend.region
        )
      }
      >
      <div className="card__info w-full h-full p-5">
        <p className="font-bold text-4xl text-slate-600">{trend.name}</p>
        <p className="text-md mt-4 text-slate-600">Search Volume: {trend.searchVolume}</p>
        <p className="text-md mt-4 text-slate-600">Region: {trend.region}</p>
      </div>
    </div>
  );
};

export default Card;
