import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import getSymbolFromCurrency from 'currency-symbol-map';
import { fetchFixerIoCurrencies, fetchFixerSupportedSymbols, fetchOandaSupportedSymbols, fetchOandaCurrencies } from '../../utils/currencySourceApi.util';


const customStyles = {
	control: (base) => ({
		...base,
		height:    64,
		minHeight: 64,
	}),
};

class CurrencyCalculator extends React.Component {
	constructor(props) {
		super(props);
		this.options = [];
		this.currencySourceOptions = [
			{ value: 'Fixer', label: 'Fixer' },
			{ value: 'Oanda', label: 'Oanda' },
		];
		this.state = {
			startDate:         new Date(),
			inputValue:        null,
			currencySource:    '',
			currenciesFetched: false,
			currencyFrom:      '',
			currencyTo:        '',
			currencyRate:      null,
			error:             false,
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.currencySource !== this.state.currencySource) {
			if (this.state.currencySource === 'Fixer') {
				fetchFixerSupportedSymbols().then((res) => {
					this.convertResponse(res.data.symbols);
					this.setState({ currenciesFetched: true, error: false });
				}).catch((error) => {
					console.log(error);
				});
			} else {
				fetchOandaSupportedSymbols().then((res) => {
					this.convertResponse(res.data.currencies);
					this.setState({ currenciesFetched: true, error: false });
				}).catch((error) => {
					console.log(error);
				});
			}
		}
	}

	onSourceSelectChange = (source) => {
		this.setState({
			currencySource: source,
		});
	}

	onCurrencySelectChange = (from, currencySymbol) => {
		this.setState({
			[from ? 'currencyFrom' : 'currencyTo']: currencySymbol.value,
		}, () => {
			this.fetchCurrencyRate();
		});
	}

	setStartDate = (date) => {
		this.setState({
			startDate: date,
		}, () => {
			this.fetchCurrencyRate();
		});
	}

	convertResponse = (response) => {
		const convertedArray = [];
		if (Array.isArray(response)) {
			for (let i = 0; i < response.length; i++) {
				convertedArray[i]  = {
					value: response[i].code,
					label: <span><div className={`currency-flag currency-flag-sm currency-flag-${response[i].code.toLowerCase()}`} />{response[i].code}</span>,
				};
			}
		} else {
			const arrayResponse = Object.keys(response);
			for (let i = 0; i < arrayResponse.length; i++) {
				convertedArray[i] = {
					value: arrayResponse[i],
					label: <span><div className={`currency-flag currency-flag-sm currency-flag-${arrayResponse[i].toLowerCase()}`} />{arrayResponse[i]}</span>,
				};
			}
		}
		this.options = convertedArray;
		console.log(this.options.length);
	}

	fetchCurrencyRate = (e) => {
		const { currencyFrom, currencyTo, startDate, currencySource } = this.state;
		console.log(this.input.value);
		if (this.input.value !== '' && currencyFrom !== '' && currencyTo !== '') {
			if (currencySource === 'Oanda') {
				fetchOandaCurrencies(currencyFrom, currencyTo, startDate).then((res) => {
					console.log(res);
					this.setState({
						currencyRate: res.data.quotes[0]?.average_midpoint || res.data.quotes[0]?.midpoint,
						error:        false,
					});
				});
			} else {
				fetchFixerIoCurrencies(currencyFrom, startDate).then((res) => {
					this.setState({
						currencyRate: res.data.rates[currencyTo],
						error:        false,
					});
				}).catch((error) => {
					this.setState({ currencyRate: null, error: true });
					alert('Unsupported Base Currency (API Limitations)');
				});
			}
		}
	}

	renderCalculatorFields = () => {
		const { currencyFrom } = this.state;

		return (
			<div className='fields'>
				<div className='currency-fields'>
					<div className='input-wrapper'>
						{currencyFrom ? <span className='currency-symbol'>{getSymbolFromCurrency(currencyFrom)}</span> : ''}
						<input
							type='number'
							onChange={(e) => {
								this.setState({
									inputValue: e.target.value,
								}, () => {
									this.fetchCurrencyRate(e);
								});
							}}
							ref={(inputRef) => this.input = inputRef}
						/>
					</div>
					<Select
						styles={customStyles}
						className='currency-select'
						options={this.options.length > 0 ? this.options : []}
						onChange={(input) => {
							this.onCurrencySelectChange(true, input);
						}}
					/>
					<svg onClick={() => this.swapCurrencies()} aria-hidden='true' data-id='icon-exchange' viewBox='0 0 50 47' height='32px' width='30px'>
						<path fill='currentColor' fillRule='evenodd' d='M49.897 35.977L26.597 25v7.874H7.144v6.207h19.455v7.874zM.103 11.642l23.3 10.977v-7.874h19.454V8.538H23.402V.664z' />
					</svg>
					<Select
						styles={customStyles}
						className='currency-select'
						options={this.options.length > 0 ? this.options : []}
						onChange={(input) => {
							this.onCurrencySelectChange(false, input);
						}}
					/>
				</div>
			</div>
		);
	}

	calculateAndDisplayRate = () => {
		const { inputValue, currencyRate, currencyTo } = this.state;
		return (
			<h3>{inputValue * currencyRate} {currencyTo}</h3>
		);
	}

	renderResult = () => {
		const { currencyFrom, currencyTo, error } = this.state;
		if (currencyFrom !== '' && currencyTo !== '' && this.input.value !== '' && !error) {
			return (
				<>
					<div className='result'>
						<h3>
							{this.input.value} {this.state.currencyFrom}
						</h3>
						<svg aria-hidden='true' data-id='icon-exchange' viewBox='0 0 50 47' height='32px' width='30px'>
							<path fill='currentColor' fillRule='evenodd' d='M49.897 35.977L26.597 25v7.874H7.144v6.207h19.455v7.874zM.103 11.642l23.3 10.977v-7.874h19.454V8.538H23.402V.664z' />
						</svg>
						{this.calculateAndDisplayRate()}
						<div className='currency-rates'>
							<p>1 EUR = 1.21821 USD</p>
							<p>1 USD = 0.820875 EUR</p>
						</div>
					</div>
					<div className='notes'>
						<form className='form-inline'>
							<div className='form-group mx-sm-3 mb-2'>
								<label htmlFor='inputPassword2' className='sr-only'>Notes</label>
								<input type='text' className='form-control' id='notes' placeholder='Your notes' />
							</div>
							<button type='submit' className='btn btn-primary mb-2'>Save</button>
						</form>
					</div>
				</>
			);
		}
		return <div />;
	}


	render() {
		return (
			<>
				<form className='calculator' action=''>
					<div className='form-header'>
						<div className='text'>
							<h2>Currency Calculator</h2>
							<p>Choose currency and enter the required values</p>
						</div>
						<div className='currency-source'>
							<Select
								styles={customStyles}
								onChange={(input) => this.onSourceSelectChange(input.value)}
								className='currency-select'
								options={this.currencySourceOptions}
							/>
							<DatePicker
								selected={this.state.startDate}
								maxDate={new Date()}
								onChange={(date) => {
									this.setStartDate(date);
								}}
							/>
						</div>
					</div>
					{this.renderCalculatorFields()}
				</form>
				{this.renderResult()}
			</>
		);
	}
}


export default CurrencyCalculator;
