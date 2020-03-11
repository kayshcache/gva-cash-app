import React from 'react';
import axios from 'axios';
import MoneyInput from './MoneyInput';

// TODO: learn React-axios

export default class CashFloatForm extends React.Component {
  constructor(props) {
    super(props);
    this.tokenValues = [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100];
    this.state = {
      fiveCents: 0,
      tenCents: 0,
      twentyCents: 0,
      fiftyCents: 0,
      oneDollar: 0,
      twoDollars: 0,
      fiveDollars: 0,
      tenDollars: 0,
      twentyDollars: 0,
      fiftyDollars: 0,
      oneHundredDollars: 0,
      _id: '',
      total: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/cash')
      .then(res => {
	this.setState(
	  res.data.cashFloats[0],
	);
	this.setState({
	  _id: res.data.cashFloats[0]._id,
	  total: res.data.total,
	});
	console.log(res.data);
      })
      .catch(err => console.warn(err));
  }

  handleChange(event) {
    console.log();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const updatedCash = {};
    for (let element of event.target.elements) {
      if (element.name) updatedCash[element.name] = parseInt(element.value);
    }

    axios({
      url: `/cash/${this.state._id}`,
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      data: updatedCash,
    })
      .then(res => console.log(res.data))
      .catch(err => console.warn(err));
    event.preventDefault();
  }

  render() {
    const aud = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' });
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Total Sum: {aud.format(this.state.total)}</p>
	<input type="submit" value="Submit" />
	{
	  Object.entries(this.state).filter(token => token[0].length > 5).map(token =>
	    (<MoneyInput key={token[0]} name={token[0]} value={token[1]} onChange={this.handleChange} />))
	}
      </form>
    );
  }
}
