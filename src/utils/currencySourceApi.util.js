import axios from 'axios';

export const fetchOandaSupportedSymbols = () => {
	const API_KEY = 'imag5HqPlTJBbZv5c6Dj8Xet';
	// https://www1.oanda.com/rates/api/v2/rates/candle.json?api_key=imag5HqPlTJBbZv5c6Dj8Xet&data_set=ecb&date_time=2021-01-03&base=AUD&quote=BGN&fields=averages
	// https://www1.oanda.com/rates/api/v2/rates/candle.json?api_key=imag5HqPlTJBbZv5c6Dj8Xet&data_set=ecb&date_time=2021-01-04&base=EUR&quote=BGN&fields=averages
	const baseUrl = `https://www1.oanda.com/rates/api/v2/currencies.json?api_key=${API_KEY}`;
	const res = axios.get(baseUrl, {
		params: {
			access_key: API_KEY,
		},
	});
	return res;
};

export const fetchOandaCurrencies = (base = 'EUR', destination, date) => {
	let baseUrl = '';
	const API_KEY = 'imag5HqPlTJBbZv5c6Dj8Xet';
	const truncatedDate = date.toISOString().split('T')[0];
	const selectedDate = `${truncatedDate}T00:30:00+01:00`;
	const isToday = truncatedDate === new Date().toISOString().split('T')[0];
	if (isToday) {
		baseUrl = `https://www1.oanda.com/rates/api/v2/rates/spot.json?api_key=imag5HqPlTJBbZv5c6Dj8Xet&base=${base}&quote=${destination}`;
	} else {
		baseUrl = `https://www1.oanda.com/rates/api/v2/rates/candle.json?api_key=imag5HqPlTJBbZv5c6Dj8Xet&date_time=${selectedDate}&base=${base}&quote=${destination}&fields=averages`;
	}
	const res = axios.get(baseUrl);

	return res;
};

export const fetchFixerSupportedSymbols = () => {
	const API_KEY = '52cc0dd3e07cfdb9ed579a8fa893ef31';
	const baseUrl = `http://data.fixer.io/api/symbols`;
	const res = axios.get(baseUrl, {
		params: {
			access_key: API_KEY,
		},
	});

	return res;
};

export const fetchFixerIoCurrencies = (base = 'EUR', date) => {
	const API_KEY = '52cc0dd3e07cfdb9ed579a8fa893ef31';
	const selectedDate = date.toISOString().split('T')[0];
	const baseUrl = `http://data.fixer.io/api/${selectedDate}?access_key=${API_KEY}&base=${base}`;
	const res = axios.get(baseUrl, {
		params: {
			access_key: API_KEY,
			base,
		},
	});

	return res;
};
