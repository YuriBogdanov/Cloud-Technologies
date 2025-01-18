export const analyzeBrand = async (brand, startDate, endDate) => {
    const response = await fetch(
      `http://localhost:8080/api/analyze?brand=${brand}&start_date=${startDate}&end_date=${endDate}`
    );
    return response.json();
  };