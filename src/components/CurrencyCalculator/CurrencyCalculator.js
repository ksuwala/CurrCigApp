import React, { useState } from 'react';
import Select from "react-select";
import DatePicker from "react-datepicker";
import { fetchFixerIoCurrencies, fetchFixerSupportedSymbols, fetchOandaSupportedSymbols } from '../../utils/currencySourceApi.util';

const currencySourceOptions = [
	{value: 'Fixer', label: 'Fixer'},
	{value: 'Currency Source #2', label: 'Currency Source #2'}
];

const customStyles = {
	control: base => ({
		...base,
		height: 64,
		minHeight: 64
	})
};

class CurrencyCalculator extends React.Component {
	constructor(props) {
		super(props);
		this.options = []
		this.state = {
			startDate: new Date(),
			currencySource: 'Fixer',
			currenciesFetched: false,
			currencyFrom: '',
			currencyTo: ''
		}
	}

	componentDidMount() {
		// fetchFixerIoCurrencies()
		// fetchOandaSupportedSymbols();
		fetchFixerSupportedSymbols().then((res) => {
			this.convertResponse(res.data.symbols);
			this.setState({currenciesFetched: true});
		}).catch((error) => {
			console.log(error);
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevState.currencySource !== this.state.currencySource) {
			if(this.state.currencySource === 'Fixer') {
				fetchFixerSupportedSymbols().then((res) => {
					this.convertResponse(res.data.symbols);
					this.setState({currenciesFetched: true});
				}).catch((error) => {
					console.log(error);
				})
			} else {
				fetchOandaSupportedSymbols().then((res) => {
					// this.convertResponse(res.data.symbols);
					console.log(res)
					this.setState({currenciesFetched: true});
				}).catch((error) => {
					console.log(error);
				});
			}
		}
	}

	swapCurrencies = () => {

		this.setState({
			['currencyTo']: 'USD',
		})
	}

	onSourceSelectChange = (source) => {
		this.setState({
			currencySource: source,
		})
	}

	onCurrencySelectChange = (from, currencySymbol) => {
		this.setState({
			[from ? 'currencyFrom' : 'currencyTo']: currencySymbol,
		})
	}

	setStartDate = (date) => {
		this.setState({
			startDate: date
		})
	}

	convertResponse = (response) => {
		const arrayResponse = Object.keys(response)
		const convertedArray = [];
		for ( let i = 0; i < arrayResponse.length; i++ ) {
			convertedArray[i] = {
				value: arrayResponse[i],
				label: <span><div className={`currency-flag currency-flag-sm currency-flag-${arrayResponse[i].toLowerCase()}`}></div>{arrayResponse[i]}</span>
			}
		}
		this.options = convertedArray;
	}

	renderCalculatorFields = () => {
		return (
			<div className="fields">
				<div className="currency-fields">
					<div className="input-wrapper">
						<span className="currency-symbol">$</span>
						<input type="number" />
					</div>
					<Select styles={customStyles}
					        className='currency-select'
					        options={this.options.length > 0 ? this.options : []}
					        onChange={(input) => this.onCurrencySelectChange(true, input)}
					/>
					<svg onClick={() => this.swapCurrencies()} aria-hidden="true" data-id="icon-exchange" viewBox="0 0 50 47" height="32px" width="30px">
						<path fill="currentColor" fill-rule="evenodd" d="M49.897 35.977L26.597 25v7.874H7.144v6.207h19.455v7.874zM.103 11.642l23.3 10.977v-7.874h19.454V8.538H23.402V.664z"></path>
					</svg>
					<Select
						styles={customStyles}
						className='currency-select'
						options={this.options.length > 0 ? this.options : []}
						onChange={(input) => this.onCurrencySelectChange(false, input.value)}
					/>
				</div>
			</div>
		)
	}

	render () {
		return (
			<form className='calculator' action="">
				<div className="form-header">
					<div className="text">
						<h2>Currency Calculator</h2>
						<p>Choose currency and enter the required values</p>
					</div>
					<div className="currency-source">
						<Select
							styles={customStyles}
			        onChange={(input) => this.onSourceSelectChange(input.value)}
							className='currency-select'
							options={currencySourceOptions}
						/>
						<DatePicker selected={this.state.startDate} onChange={date => this.setStartDate(date)} />
					</div>
				</div>
				{this.renderCalculatorFields()}
			</form>
		);
	}
}


export default CurrencyCalculator;
