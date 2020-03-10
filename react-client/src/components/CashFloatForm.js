import React from 'react';

export default class CashFloatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({fiveCents: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state.fiveCents);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Five Cents:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
	<p><textarea value={this.state.fiveCents} onChange={this.handleChange} /></p>
      </form>
    );
  }
}
