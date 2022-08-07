const Person = ({person, onPersonDelete}) => {
    return (
        <>
            <li>{person.name} {person.number} <button type="button" onClick={onPersonDelete}>Delete</button></li>
        </>
    )
}

export default Person;