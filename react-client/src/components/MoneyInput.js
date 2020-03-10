import React from 'react';

export default function MoneyInput(props) {
  return (
      <p>
        <label>
	  {props.name}:&nbsp;
          <input
            type="text"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
           />
        </label>
      </p>
  );
}
