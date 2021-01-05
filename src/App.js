import './App.scss';
import CurrencyCalculator from "./components/CurrencyCalculator/CurrencyCalculator";
import ExchangeHistory from "./components/ExchangeHistory/ExchangeHistory"
function App() {
	return (
		<>
			<div className="main">
				<div className="calculator-wrapper">
					<CurrencyCalculator/>
				</div>
				<div className="history-wrapper">
					<ExchangeHistory/>
				</div>
			</div>
		</>
	);
}

export default App;
