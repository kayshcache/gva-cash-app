import React from 'react';

export default function SubmitTotalButton(props) {
  const aud = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' });
  return (
    <input type="submit" value={'Submit: ' + aud.format(props.total)} />
  );
}
