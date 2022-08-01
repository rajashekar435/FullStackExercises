const CountryFilter = ({countryFilter, onChange}) =>{
    return(
        <div>
            Find countries: <input value={countryFilter} onChange={onChange}/>
        </div>
    )
}

export default CountryFilter;