import Person from "./Person";

const Persons = ({nameFilter,persons, onPersonDelete}) => {

    
    const personsToShow = nameFilter ==='' ? persons : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()));

    return(
        <div>
            <ul>
                {personsToShow.map(person => <Person key={person.id} person={person} onPersonDelete={() => onPersonDelete(person.id)}/>)}
            </ul>
            
        </div>
    )
}

export default Persons;