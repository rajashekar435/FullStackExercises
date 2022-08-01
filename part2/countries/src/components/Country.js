import Weather from "./Weather";

const Country =  ({country}) =>{
    return(
        <div>
          <h3>{country.name.official}</h3>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h4>Languages:</h4>
          <ul>
            {Object.values(country.languages).map((language,index) => <li key={index}>{language}</li>)}
          </ul>
          <h4>Country Flag: </h4>
          <p style={{fontSize: 100,margin:0,padding:0}}>{JSON.parse('"'+country.flag+'"')}</p>

          <h3>Weather for {country.capital[0]}</h3>
          <Weather country={country} />

        </div>
    )
}

export default Country;