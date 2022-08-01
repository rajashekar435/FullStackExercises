import axios from 'axios';
import {useState, useEffect} from 'react';

import Countries from './components/Countries';
import CountryFilter from './components/CountryFilter';


function App() {

  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() =>{
    axios
          .get("https://restcountries.com/v3.1/all")
          .then(response =>{
            setCountries(response.data);
          });
  },[]);

  const onCountryFilterChange = event => setCountryFilter(event.target.value);

  return (
    <div>
      <h1>Countries</h1>

      <CountryFilter countryFilter={countryFilter} onChange={onCountryFilterChange}/>

      <h2>Countries matching the filter: </h2>
      
      <Countries countries={countries} countryFilter={countryFilter} />

    </div>
    
  );
}

export default App;
