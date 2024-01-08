import React from "react";
import Card from "./Card";


const cards = [
  {
    id: 1,
    title: "SERVIDOR PABLO",
    image: "/servidor.png",
    url: "100.86.28.87",
    NombreSO: "Linux Centos",
    Ip: "100.86.28.87",
  },
  {
    id: 2,
    title: "SERVIDOR EGUINO",
    image: "/servidor.png",
    url: "100.113.177.155",
    NombreSO: "Linux Opensuse",
    Ip: "100.113.177.155",
  },
  {
    id: 3,
    title: "SERVIDOR PROPIO",
    image: "/servidor.png",
    url: "127.0.0.1:5000",
    NombreSO: "Windows",
    Ip: "100.90.181.113:5000",
  },
];

function Cards() {
  return (
    <div className="bg-slate-950 h-screen">
      <div className="text-center p-10 ">
        <h1 className="text-4xl font-bold text-white">ADMINISTRACION DE RECURSOS</h1>
      </div>

      <div className="container mx-auto flex justify-center items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {cards.map(({ title, image, url, id, NombreSO, Ip }) => (
            <div className="flex" key={id}>
              <Card
                imageSource={image}
                title={title}
                url={url}
                NombreSO={NombreSO}
                Ip={Ip}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
