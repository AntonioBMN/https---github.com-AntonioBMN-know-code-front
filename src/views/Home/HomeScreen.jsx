import React, { useEffect, useState } from "react";
import { Bars } from "react-loading-icons";

import "./styles.css";
import { countOccourrences } from "../../services/HomeService/HomeService";
export function HomeScreen() {
  const [object, setObject] = useState([{ file: "", word: "" }]);
  const [occurrences, setOccurrences] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomString, setRandomString] = useState();

  const handleFile = (e, index) => {
    setErrors("");
    const updated = [...object];
    updated[index].file = e.target.files[0];
    setObject(updated);
  };

  const handleText = (e, index) => {
    setErrors("");
    const updated = [...object];
    updated[index].word = e.target.value;
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

  const handleButtonPress = async () => {
    setErrors("");
    setLoading(true);
    if (
      object[object.length - 1].file === "" ||
      object[object.length - 1].word === ""
    ) {
      setErrors("Verifique se anexou o arquivo ou se escreveu a palavra.");
      return;
    }
    const mount = [];

    const response = await countOccourrences(object);
    response.forEach((element) => {
      mount.push(element[1]);
    });
    setOccurrences(mount);
  };

  const handleResetPage = () => {
    setObject([{ file: "", word: "" }]);
    setLoading(false);
    setOccurrences([]);
    setErrors("");
    setRandomString(Math.random().toString(36));
  };

  return (
    <>
      <div className="container ">
        <div className="mt-5 text-center">
          <h1>Selecione um arquivo e escreva qual palavra deseja buscar.</h1>
        </div>
        {object.map((data, i) => {
          return (
            <div className="d-flex mt-3 mb-3" key={i}>
              <div className="button-div mr-3">
                <input
                  key={randomString}
                  type="file"
                  id="files"
                  disabled={occurrences.length > 0 && "true"}
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
                disabled={occurrences.length > 0 && "true"}
                placeholder="Digite aqui a palavra"
                type="text"
                value={object[i].word}
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

        {occurrences.length > 0 ? (
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleResetPage}
            >
              Resetar página
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleButtonPress}
            >
              {loading ? (
                <span className="loading-icon">
                  <Bars className="loading-icon" />
                </span>
              ) : (
                <>Buscar</>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
