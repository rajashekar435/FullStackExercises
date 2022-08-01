import Country from "./Country";
import { useState } from "react";

const Countries = ({ countries, countryFilter }) => {

    const [showSingleCountry, setShowSingleCountry] = useState(false);
    const [countryToShow, setCountryToShow] = useState({});
    const [trackingCountryFilter, setTrackingCountryFilter] = useState(countryFilter);
    
    if(countryFilter !== trackingCountryFilter)
    {
        setShowSingleCountry(false);
        setCountryToShow({});
        setTrackingCountryFilter(countryFilter);
    }
    const onShowSingleCountryChange = (event) => {
        const newCountryToShow = JSON.parse(event.target.value);
        if (showSingleCountry === true) {
            if (newCountryToShow.cca2 === countryToShow.cca2) {
                setShowSingleCountry(!showSingleCountry);
                setCountryToShow({});
            }

            else {
                setCountryToShow(newCountryToShow);
            }
        }
        else {
            setCountryToShow(newCountryToShow);
            setShowSingleCountry(!showSingleCountry);
        }

    }

    if (countryFilter === '')
        return (<div>Type something in the search box to find the countries</div>);

    const countriesToShow = countries.filter(country => country.name.official.toLowerCase().includes(countryFilter.toLowerCase()));

    if (countriesToShow.length === 0)
        return (<div>No countries match the current filter. Try another filter</div>)
    else if (countriesToShow.length > 10)
        return (<div>Too many matches, specify another filter</div>);
    else if (countriesToShow.length > 1 && countriesToShow.length <= 10)
        return (
            <div>
                <table>
                    <tbody>
                        {countriesToShow.map(country => {
                            return (
                                <tr>
                                    <td key={country.cca2}>{country.name.official}</td>
                                    <td>
                                        <button
                                            key={country.cca2}
                                            type="button"
                                            value={JSON.stringify(country)}
                                            onClick={onShowSingleCountryChange}
                                        >
                                            {showSingleCountry && (countryToShow.name.official === country.name.official) ? "Hide" : "Show"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                </table>
                {showSingleCountry ? <Country key={countryToShow.cca2} country={countryToShow} /> : <></>}
            </div>
        )
    else {
        return (
            <Country key={countriesToShow[0]} country={countriesToShow[0]} />
        );
    }
}

export default Countries;