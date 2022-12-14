import axios from 'axios';
axios.defaults.withCredentials = true;

//agregar libro a trade
export const addToTrade = async (tradeId,book) => await axios.post(`http://localhost:8000/api/trade/${tradeId}`,book);
//obtener un trade
export const getOneTrade = async (tradeId) => await axios.get(`http://localhost:8000/api/trade/get-one/${tradeId}`);