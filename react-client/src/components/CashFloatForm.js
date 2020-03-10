import React from 'react';
import axios from 'axios';
import MoneyInput from './MoneyInput';

// TODO: learn React-axios

export default class CashFloatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cashFloat: {
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
      },
      cashFloatId: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    axios.get('/cash')
      .then(res => {
	this.setState(
	  res.data[0],
	);
	  //cashFloatId: res.data[0]._id,
      })
      .catch(err => console.warn(err));
  }

  handleChange(event) {
    console.log();
    this.setState({
      cashFloat: {
	[event.target.name]: event.target.value,
      }
    });
  }

  handleSubmit(event) {
    const updatedCash = {};
    for (let element of event.target.elements) {
      if (element.name) updatedCash[element.name] = parseInt(element.value);
    }

    axios({
      url: `/cash/${this.state.cashFloatId}`,
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      data: updatedCash,
    })
      .then(res => console.log(res.data))
      .catch(err => console.warn(err));

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <input type="submit" value="Submit" />
      {
	Object.entries(this.state.cashFloat).filter(token => token[0].length > 5).map(token =>
	  (<MoneyInput name={token[0]} value={token[1]} onChange={this.handleChange} />))
      }
      </form>
    );
  }
}
