import * as React from 'react';

class ExchangeHistory extends React.Component {

	render () {
		let history = JSON.parse(localStorage.getItem('exchangeHistory'))
		return (
			<div className='exchange-history'>
				<table className="table table-responsive">
					<thead>
					<tr>
						<th scope="col">Source Currency</th>
						<th scope="col">Source Amount</th>
						<th scope="col">Destination Currency</th>
						<th scope="col">Calculated Amount</th>
						<th scope="col">DateTime</th>
						<th scope="col">Rate Source</th>
						<th scope="col">Notes</th>
					</tr>
					</thead>
					<tbody>
					{ history.map((row) =>
						<tr>
							<td>{row.currencyFrom}</td>
							<td>{row.value}</td>
							<td>{row.currencyTo}</td>
							<td>{row.calculatedAmount}</td>
							<td>{row.date}</td>
							<td>{row.source}</td>
							<td>{row.notes}</td>
						</tr>
					) }
					</tbody>
				</table>
			</div>
		);
	}
}


export default ExchangeHistory;
