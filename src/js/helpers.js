import { TIMEOUT_SEC } from './config.js';
//const TIMEOUT_SEC = 5;
export const getJSON = async function (url) {
    try {

    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // Para validar, mostramos la respuesta en consola
    console.log('Resultado:', res);
    console.log('Data:', data);
    // ❌ Valida si la respuesta fue exitosa
    if (!res.ok) {
        const message = data?.message || 'Unknown error';
        throw new Error(`${message} (${res.status})`);
    }
    return data;
        }
    catch (err) {
        throw err;
    }
};
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};