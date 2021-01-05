import axios from "axios";

export const fetchOandaSupportedSymbols = () => {
	const API_KEY = 'imag5HqPlTJBbZv5c6Dj8Xet'
	// https://www1.oanda.com/rates/api/v2/rates/candle.json?api_key=imag5HqPlTJBbZv5c6Dj8Xet&data_set=ecb&date_time=2021-01-03&base=AUD&quote=BGN&fields=averages
	const baseUrl = `https://www1.oanda.com/rates/api/v2/currencies.json?api_key=${API_KEY}`;
	const res = axios.get(baseUrl, {
		params: {
			access_key: API_KEY,
		}
	})
	return res;
}

export const fetchFixerSupportedSymbols = () => {
	const API_KEY = '52cc0dd3e07cfdb9ed579a8fa893ef31'
	const baseUrl = `http://data.fixer.io/api/symbols`;
	const res = axios.get(baseUrl, {
		params: {
			access_key: API_KEY,
		}
	})

	return res;
}

export const fetchFixerIoCurrencies = (base = "EUR") => {
	const API_KEY = '52cc0dd3e07cfdb9ed579a8fa893ef31'
	const baseUrl = `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=EUR`;
	axios.get(baseUrl, {
		params: {
			access_key: API_KEY,
			base: base,
		}
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	})
}
