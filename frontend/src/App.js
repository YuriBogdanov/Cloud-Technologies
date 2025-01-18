import React, { useState } from 'react';
import { ClipLoader } from "react-spinners"; // Импорт спиннера
import { analyzeBrand } from './api/api';
import "./App.css"; // Импорт стилей

function App() {
  const [brand, setBrand] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  const handleAnalyze = async () => {
    setIsLoading(true); // Начинаем загрузку
    try {
      const result = await analyzeBrand(brand, startDate, endDate);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Ошибка при анализе:", error);
    } finally {
      setIsLoading(false); // Заканчиваем загрузку
    }
  };

  return (
    <div>
      <h1>Анализ бренда</h1>
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Введите название бренда"
      />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Начальная дата"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="Конечная дата"
      />

      <button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? "Анализ..." : "Анализ"}
      </button>

      {isLoading && (
        <div className="loading-container">
          <ClipLoader color="#36d7b7" size={50} />
          <p className="loading-text">Идет анализ данных...</p>
        </div>
      )}

      {analysisResult && !isLoading &&(
        <div>
          <h2>Результаты анализа для {brand}</h2>
          <p>Упоминания: {analysisResult.mentions}</p>
          <p>Лайки: {analysisResult.likes}</p>
          <p>Репосты: {analysisResult.reposts}</p>
          <p>Просмотры: {analysisResult.views}</p>
        </div>
      )}
    </div>
  );
}

export default App;