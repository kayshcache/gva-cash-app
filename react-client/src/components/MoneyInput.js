import React from 'react';

function formatTranscription(denomination) {
  // Take the camelCase token key and change to transcripted English words
  let transcription = denomination.split('')
    .map(char => char === char.toUpperCase() ? ' ' + char : char)
  transcription[0] = transcription[0].toUpperCase();
  return transcription.join('');
}

export default class MoneyInput extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.value = props.value;
    this.onChange = props.onChange;
    this.handleChange = this.handleChange.bind(this);
    this.formatTranscription = this.formatTranscription.bind(this);
    this.state = {
      worth: props.worth,
      amount: props.value
    }
  }

  handleChange(event) {
    this.setState({
      amount: [event.target.value]
    });
  }

  formatTranscription(key) {
    // Take the camelCase token key and change to transcripted English words
    let transcription = key.split('')
      .map(char => char === char.toUpperCase() ? ' ' + char : char)
    transcription[0] = transcription[0].toUpperCase();
    return transcription.join('');
  }

  render() {
    const amount = this.state.amount;
    return (
      <fieldset>
	<legend>{formatTranscription(this.name)}</legend>
	<label>
	Number amount:&nbsp;
	</label>
	<input
	  type="text"
	  name={this.name}
	  value={amount}
	  onChange={this.handleChange}
	 />
	<label>
	&nbsp;Dollar amount:&nbsp;$
	</label>
	<input
	  type="text"
	  name={this.name}
	  value={amount * this.state.worth}
	  onChange={this.handleChange}
	 />
      </fieldset>
    );
  }
}
