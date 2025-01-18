import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { analyzeBrand } from "./api/api";
import "./App.css";

function App() {
  const [brand, setBrand] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeBrand(brand, startDate, endDate);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Ошибка при анализе:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Анализ бренда</h1>
      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <label>Название бренда:</label>
            </td>
            <td>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Введите название бренда"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Начальная дата:</label>
            </td>
            <td>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Конечная дата:</label>
            </td>
            <td>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? "Анализ..." : "Анализ"}
      </button>

      {isLoading && (
        <div className="loading-container">
          <ClipLoader color="#ff00ff" size={50} />
          <p className="loading-text">Идет анализ данных...</p>
        </div>
      )}

      {analysisResult && !isLoading && (
        <div className="result-container">
          <h2>Результаты анализа для {brand}</h2>
          <table className="result-table">
            <tbody>
              <tr>
                <td>Упоминания:</td>
                <td>{analysisResult.mentions}</td>
              </tr>
              <tr>
                <td>Лайки:</td>
                <td>{analysisResult.likes}</td>
              </tr>
              <tr>
                <td>Репосты:</td>
                <td>{analysisResult.reposts}</td>
              </tr>
              <tr>
                <td>Просмотры:</td>
                <td>{analysisResult.views}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;