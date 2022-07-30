const Persons = ({nameFilter,persons}) => {
    const personsToShow = nameFilter ==='' ? persons : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()));
    return(
        <div>
            {personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons;