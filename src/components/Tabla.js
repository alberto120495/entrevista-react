import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./Tabla.css";
import TablaForm from "./TablaForm";
import { toast } from "react-toastify";

function Tabla() {
  const [empleados, setEmpleados] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getEmpleados = () => {
    db.collection("empleados").onSnapshot((snapshot) =>
      setEmpleados(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      )
    );
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const addOrEditEmployer = async (employerObject) => {
    try {
      if (currentId === "") {
        await db.collection("empleados").add(employerObject);
        toast("Nuevo empleado añadido", {
          type: "success",
          autoClose: 2000,
        });
      } else {
        await db.collection("empleados").doc(currentId).update(employerObject);
        toast("Empleado actualizado", {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployer = async (id) => {
    if (window.confirm("Estas seguro de querer eliminar este empleado ?")) {
      await db.collection("empleados").doc(id).delete();
      toast("Empleado eliminado", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  //TODO
  function formatNumber(n) {
    n = String(n).replace(/\D/g, "");
    return n === "" ? n : Number(n).toLocaleString();
  }
  return (
    <div className="tabla">
      <div className="tabla__mostrar">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Empresa</th>
              <th scope="col">Salario</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          {empleados.map((empleado) => (
            <tbody key={empleado.id}>
              <tr>
                <td className="table-primary">{empleado.data.nombre}</td>
                <td className="table-success">{empleado.data.apellido}</td>
                <td className="table-danger">{empleado.data.empresa}</td>
                <td
                  className={`table-warning verde ${
                    empleado.data.salario < 10000 && "rojo"
                  }`}
                >
                  ${formatNumber(empleado.data.salario)}
                </td>
                <td>
                  <i
                    className="material-icons text-danger"
                    onClick={() => deleteEmployer(empleado.id)}
                  >
                    clear
                  </i>
                  <i
                    className="material-icons "
                    onClick={() => setCurrentId(empleado.id)}
                  >
                    create
                  </i>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="tabla__formulario">
        <TablaForm {...{ addOrEditEmployer, currentId }} />
      </div>
    </div>
  );
}

export default Tabla;
