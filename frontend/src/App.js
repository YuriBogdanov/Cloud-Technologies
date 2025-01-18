import React, { useState } from 'react';
import { analyzeBrand } from './api/api';

function App() {
  const [brand, setBrand] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    const result = await analyzeBrand(brand, startDate, endDate);
    setAnalysisResult(result);
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

      <button onClick={handleAnalyze}>Анализ</button>

      {analysisResult && (
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