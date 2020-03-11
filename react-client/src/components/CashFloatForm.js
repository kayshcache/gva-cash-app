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


function formatTranscription(denomination) {
  // Take the camelCase token key and change to transcripted English words
  let transcription = denomination.split('')
    .map(char => char === char.toUpperCase() ? ' ' + char : char)
  transcription[0] = transcription[0].toUpperCase();
  return transcription.join('');
}

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
  return convert(input, denomination).toString();
}

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
    this.makeTokenDollarArray = this.makeTokenDollarArray.bind(this);
  }

  componentDidMount() {
    axios.get('/cash')
      .then(res => {
	this.setState(
	  res.data.cashFloats[0],
	);
	this.setState({
	  total: res.data.total,
	});
      })
      .catch(err => console.warn(err));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: [event.target.value]
    });

  }

  makeTokenDollarArray() {
    for (let token in this.state) {
      if (token.length > 5) {
	token = [this.state[token], tryConvert(this.state[token], tokenValues[token], toDollars)];
      }
    }
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

  render() {
    const cashFloat = Object.entries(this.state).filter(entry => {
      const key = entry[0];
      return key.length > 5;
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <SubmitTotalButton key={'total-key'} total={this.state.total} />
	{/* Input field needs the token type and value from state */
	  Object.entries(this.state).filter(token => token[0].length > 5).map(token =>
	    (<MoneyInput key={token[0]} name={token[0]} value={token[1]} onChange={this.handleChange} />))
	}
      </form>
    );
  }
}

