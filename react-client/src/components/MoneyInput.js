import React from 'react';

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

export default function MoneyInput(props) {
  const count = props.value;
  const denomination = tokenValues[props.name];

  return (
    <fieldset>
      <legend>{formatTranscription(props.name)}</legend>
      <label>
      Number amount:&nbsp;
      </label>
      <input
	type="text"
	name={props.name}
	value={count}
	onChange={props.onChange}
       />
      <label>
      &nbsp;Dollar amount:&nbsp;$
      </label>
      <input
	type="text"
	name={props.name}
	value={tryConvert(count, denomination, toDollars)}
	onChange={props.onChange}
       />
    </fieldset>
  );
}
