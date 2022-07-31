import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {

  const [persons, setPersons] = useState([]);

  useEffect(()=>{
    axios
          .get("http://localhost:3001/persons")
          .then(response =>{
            console.log(response.data);
            setPersons(response.data);
          });
  },[]);

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
      const newPerson = {name: newName.trim(), number: newNumber, id:persons.length+1};
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