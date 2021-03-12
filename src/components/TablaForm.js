import React, { useState, useEffect } from "react";
import db from "../firebase";
import "./TablaForm.css";

function TablaForm({ addOrEditEmployer, currentId }) {
  const initialStateValues = {
    nombre: "",
    apellido: "",
    empresa: "",
    salario: 0,
  };
  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEditEmployer(values);
    setValues({ ...initialStateValues });
  };

  const getEmployerById = async (id) => {
    const doc = await db.collection("empleados").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getEmployerById(currentId);
    }
  }, [currentId]);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">account_box</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Jesus Alberto"
          value={values.nombre}
          name="nombre"
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">account_box</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Pimentel Navarrete"
          value={values.apellido}
          name="apellido"
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">location_city</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Brive Soluciones"
          value={values.empresa}
          name="empresa"
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">attach_money</i>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="16900"
          value={values.salario}
          name="salario"
          onChange={handleInputChange}
        />
      </div>
      <button className="save" onClick={handleSubmit}>
        {currentId === "" ? "Guardar" : "Actualizar"}
      </button>
    </form>
  );
}

export default TablaForm;
