import React from 'react';
import axios from 'axios';
import MoneyInput from './MoneyInput';
import SubmitTotalButton from './SubmitTotalButton';

const tokenValues = {
  fiveCents: 0.05,
  tenCents: 0.1,
  twentyCents: 0.2,
  fiftyCents: 0.5,
  oneDollar: 1,
  twoDollars: 2,
  fiveDollars: 5,
  tenDollars: 10,
  twentyDollars: 20,
  fiftyDollars: 50,
  oneHundredDollars: 100,
};

function toToken(figure, denomination) {
  const dollarValue = tokenValues[denomination];
  return dollarValue / figure;
}

function toDollars(tokenCount, dollarValue) {
  return tokenCount * dollarValue;
}

function tryConvert(figure, denomination, convert) {
  const input = parseFloat(figure);
  if (Number.isNaN(input)) return '';
  return convert(input, denomination);
}

export default class CashFloatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateGrandTotal = this.calculateGrandTotal.bind(this);
  }

  componentDidMount() {
    axios.get('/cash')
      .then(res => {
	this.setState(res.data[0]);
	this.setState({total: this.calculateGrandTotal()});
      })
      .catch(err => console.warn(err));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: [event.target.value]
    });
  }

  handleSubmit(event) {
    const updatedCash = {};
    for (let element of event.target.elements) {
      if (element.name) updatedCash[element.name] = parseInt(element.value);
    }
    console.dir(updatedCash);

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

  calculateGrandTotal() {
    const totals = [];
    for (let token in this.state) {
      if (token.length > 5) {
	totals.push(tryConvert(this.state[token], tokenValues[token], toDollars));
      }
    }
    return totals.reduce((acc, curr) => acc + curr);
  }

  render() {
    // Create an array of key/value pairs that only include the cash tokens from the state
    const cashArray = Object.entries(this.state).filter(entry => entry[0].length > 5);

    return (
      <form onSubmit={this.handleSubmit}>
        <SubmitTotalButton key={'total-key'} total={this.state.total} />
	{cashArray.map(token =>
	<MoneyInput
	  key={token[0]}
	  name={token[0]}
	  value={token[1]}
	  worth={tokenValues[token[0]]}
	  onChange={this.handleChange}
	/>)}
      </form>
    );
  }
}

