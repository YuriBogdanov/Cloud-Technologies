import React, { useState } from 'react';
import { analyzeBrand } from './api/api';

function App() {
  const [brand, setBrand] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    const result = await analyzeBrand(brand);
    setAnalysisResult(result);
  };

  return (
    <div>
      <h1>Анализ бренда</h1>
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Введите название бреда"
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