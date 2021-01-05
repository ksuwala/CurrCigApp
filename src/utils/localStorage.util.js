export const saveToLocalStorage = (currencyFrom, currencyTo, value, calculatedAmount, date, source, notes ) => {
	let a = [];

	a = JSON.parse(localStorage.getItem('exchangeHistory')) || [];
	a.push({ currencyFrom: currencyFrom, currencyTo: currencyTo, value: value, calculatedAmount: calculatedAmount, date: date, source: source, notes: notes });
	localStorage.setItem('exchangeHistory', JSON.stringify(a));
}
