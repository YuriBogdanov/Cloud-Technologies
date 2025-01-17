export const analyzeBrand = async (brand) => {
    const response = await fetch(`http://localhost:8080/api/analyze?brand=${brand}`);
    return response.json();
};