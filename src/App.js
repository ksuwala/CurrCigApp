import './App.scss';
import CurrencyCalculator from "./components/CurrencyCalculator/CurrencyCalculator";
import ExchangeHistory from "./components/ExchangeHistory/ExchangeHistory"
function App() {
	return (
		<>
			<div className="main">
				<div className="calculator-wrapper">
					<CurrencyCalculator/>
					<div className="result">
						<h3>
							100 USD
						</h3>
						<svg aria-hidden="true" data-id="icon-exchange" viewBox="0 0 50 47" height="32px" width="30px">
							<path fill="currentColor" fill-rule="evenodd" d="M49.897 35.977L26.597 25v7.874H7.144v6.207h19.455v7.874zM.103 11.642l23.3 10.977v-7.874h19.454V8.538H23.402V.664z"></path>
						</svg>
						<h3>90 EUR</h3>
						<div className="currency-rates">
							<p>1 EUR = 1.21821 USD</p>
							<p>1 USD = 0.820875 EUR</p>
						</div>
					</div>
				</div>
				<div className="history-wrapper">
					<ExchangeHistory/>
				</div>
			</div>
		</>
	);
}

export default App;
