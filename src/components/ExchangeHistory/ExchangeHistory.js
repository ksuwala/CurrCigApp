import * as React from 'react';

class ExchangeHistory extends React.Component {
	render () {
		return (
			<div className='exchange-history'>
				<table className="table table-responsive">
					<thead>
					<tr>
						<th scope="col">#</th>
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
					<tr>
						<th scope="row">1</th>
						<td>USD</td>
						<td>100$</td>
						<td>EUR</td>
						<td>90$</td>
						<td>04/07/2021</td>
						<td>European Central Bank</td>
						<td>Some Random Notes</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>USD</td>
						<td>100$</td>
						<td>EUR</td>
						<td>90$</td>
						<td>04/07/2021</td>
						<td>European Central Bank</td>
						<td>Some Random Notes</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>USD</td>
						<td>100$</td>
						<td>EUR</td>
						<td>90$</td>
						<td>04/07/2021</td>
						<td>European Central Bank</td>
						<td>Some Random Notes</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}


export default ExchangeHistory;
