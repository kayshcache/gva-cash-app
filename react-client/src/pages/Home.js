import React from 'react';
import { Link } from 'react-router-dom';
import CashFloatForm from '../components/CashFloatForm';
function Home() {
  return (
    <div className="Home">
      <h1>Cash Counter</h1>
      <CashFloatForm />
      <Link to="/about">Go to About page</Link>
    </div>
  )
}

export default Home;
