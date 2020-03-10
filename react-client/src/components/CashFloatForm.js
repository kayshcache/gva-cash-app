import React from 'react';
import axios from 'axios';

// TODO: learn React-axios

export default class CashFloatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cashFloat: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    axios.get('/cash')
      .then(res => {
	this.setState({
	  cashFloat: res.data[0],
	  cashFloatId: res.data[0]._id,
	});
	console.dir(this.state);
      })
      .catch(err => console.warn(err));
  }

  handleChange(event) {
    this.setState({cashFloat: {
      fiveCents: event.target.value}
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    axios.put(`/cash/${this.state.cashFloatId}`, {tenCents: event.target.value})
      .then(res => console.log(res.data))
      .catch();
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <p>
        <label>
          Five Cents:
          <input type="text" value={this.state.cashFloat.fiveCents} onChange={this.handleChange} />
        </label>
      </p>
      <p>
        <label>
          Ten Cents:
          <input type="text" value={this.state.cashFloat.tenCents} onChange={this.handleChange} />
        </label>
      </p>
        <input type="submit" value="Submit" />
	<p><textarea value={this.state.cashFloat.fiveCents} onChange={this.handleChange} /></p>
      </form>
    );
  }
}
