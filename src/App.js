import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const { default: BandAdd } = require("./components/BandAdd");
const { default: BandList } = require("./components/BandList");

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer);
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    console.log(socket);
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      console.log(bands);
      setBands(bands);
    });
  }, [socket]);

  const votar = (id) => {
    console.log("votar - app", id);
    socket.emit("votar-banda", id);
  };

  const borrar = (id) => {
    console.log("borrar - app", id);
    socket.emit("borrar-banda", id);
  };

  const cambiarNombre = (id, nombre) => {
    socket.emit("cambiar-nombre-banda", { id, nombre });
  };

  const crearBanda = ( nombre ) => {
    socket.emit("crear-banda", {nombre} );
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status:
          {online ? (
            <span className="text-success"> Online </span>
          ) : (
            <span className="text-danger"> Offline </span>
          )}
        </p>
      </div>

      <h1>Band names</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            votar={votar}
            borrar={borrar}
            cambiarNombre={cambiarNombre}
          />
        </div>

        <div className="col-4">
          <BandAdd 
            crearBanda ={crearBanda} 
          
          />
        </div>
      </div>
    </div>
  );
}

export default App;
