import React, { useEffect, useState } from "react";

import "./styles.css";
export function HomeScreen() {
  const [object, setObject] = useState([{ file: "", word: "" }]);
  const [occurrences, setOccurrences] = useState([]);
  const [errors, setErrors] = useState("");

  const handleButtonPress = () => {
    setErrors("");
    if (
      object[object.length - 1].file === "" ||
      object[object.length - 1].word === ""
    ) {
      setErrors("Verifique se anexou o arquivo ou se escreveu a palavra.");
      return;
    }
    const mount = [];
    for (var i = 0; i < object.length; i++) {
      mount.push(i);
    }
    setOccurrences(mount);
    console.log(object, object.length);
  };

  const handleFile = (e, index) => {
    setErrors("");
    const updated = [...object];
    updated[index].file = e.target.files[0];
    setObject(updated);
  };

  const handleAddLine = () => {
    setErrors("");
    if (
      object[object.length - 1].file === "" ||
      object[object.length - 1].word === ""
    ) {
      setErrors("Preencha a linha anterior para adicionar uma nova");
      return;
    }
    setObject([...object, { file: "", word: "" }]);
  };

  const handleText = (e, index) => {
    setErrors("");
    const updated = [...object];
    updated[index].word = e.target.value;
    setObject(updated);
  };

  return (
    <>
      <div className="container ">
        <div className="mt-5">
          <h1>Selecione um arquivo e escreva qual palavra deseja buscar.</h1>
        </div>
        {object.map((data, i) => {
          return (
            <div className="d-flex mt-3 mb-3" key={i}>
              <div className="button-div mr-3">
                <input
                  type="file"
                  id="files"
                  className={`form-control ${
                    errors && i === object.length - 1 && "border-red"
                  }`}
                  onChange={(e) => handleFile(e, i)}
                />
              </div>
              <input
                className={`input-text form-control ${
                  errors && i === object.length - 1 && "border-red"
                }`}
                placeholder="Digite aqui a palavra"
                type="text"
                onChange={(e) => {
                  handleText(e, i);
                }}
              />
              {occurrences.length > 0 ? (
                <div className="form-control input-text">
                  Ocorre {occurrences[i]} vezes
                </div>
              ) : (
                i + 1 === object.length && (
                  <button
                    type="button"
                    className="ml-3 btn btn-dark"
                    onClick={handleAddLine}
                  >
                    Adicionar linha
                  </button>
                )
              )}
            </div>
          );
        })}
        <div className="invalid">{errors && <>{errors}</>}</div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleButtonPress}
          >
            Buscar
          </button>
        </div>
      </div>
    </>
  );
}
