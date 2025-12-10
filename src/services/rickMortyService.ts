const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharactersFromAPI = async (page: number = 1) => {
  try {

    const response = await fetch(`${BASE_URL}/character/?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Error en la API externa: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};