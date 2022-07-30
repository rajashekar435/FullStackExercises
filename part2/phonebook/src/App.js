import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const onNameChange = (event) => setNewName(event.target.value);
  const onNumberChange = (event) => setNewNumber(event.target.value);
  const onNameFilterChange = (event) => setNameFilter(event.target.value);

  const addNewPerson = (event) =>{
    event.preventDefault();
    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) !== undefined)
      window.alert(`${newName} already exists. Enter a new name`);
    else
    {
      const newPerson = {name: newName.trim(), number: newNumber}
      setPersons(persons.concat(newPerson));
    } 
  }


  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter nameFilter={nameFilter} onChange={onNameFilterChange} />

      <h1>Add a new name</h1>
      <PersonForm
        onSubmit={addNewPerson}
        newName={newName}
        onNameChange={onNameChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
      />

      <h2>Numbers</h2>
      <Persons nameFilter={nameFilter} persons={persons} />

    </div>
  )
}

export default App;