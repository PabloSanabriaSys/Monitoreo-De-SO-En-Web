import React from "react";
import PropTypes from "prop-types";
import "animate.css/animate.css"; // Importa animate.css si no lo has hecho

function Card({ imageSource, title, url, NombreSO, Ip }) {
  return (
    <div className=" bg-slate-900 overflow-hidden animate__animated animate__fadeInUp p-4 shadow-md rounded-lg">
      <div className="overflow-hidden">
        <img src={imageSource} alt="a wallpaper" className="w-50 h-50" />
      </div>
      <div className="text-white mt-2">
        {/* Titulo de la tarjeta */}
        <h4 className="text-xl font-bold">{title}</h4>
        {/*  aqui es todo de las caracteristicas del SO */}
        <div className="text-sm">
          <p>NombreSO : {NombreSO}</p>
          <p>Ip : {Ip}</p>
        </div>
        {/* aqui es todo del button  , URL */}
        <center>
        <a
            href={url ? url : "#!"}
            target="_blank"
            className="block mt-5 px-4 py-2 bg-blue-500 text-white rounded-md"
            rel="noreferrer"
          >
            Ingresar al servidorr
          </a>
        </center>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string,
  NombreSO: PropTypes.string,
  Ip: PropTypes.string,
};

export default Card;
