/*export default async function createRequest(options) {
  try {
    const BASE_URL = 'https://shfe-diplom.neto-server.ru/';
    const response = await fetch(BASE_URL + options.url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};*/



export default async function createRequest(options) {
  try {
    const BASE_URL = 'https://shfe-diplom.neto-server.ru/';
    const response = await fetch(BASE_URL + options.url, options);
    if (!response.ok) {
      throw new Error('API Error');
    }
    return await response.json();
  } catch (error) {
    return { error: error.message }; // Вернуть ошибку
  }
}