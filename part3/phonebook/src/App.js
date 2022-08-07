import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/PersonService';
import Notification from './components/Notification';

const App = () => {

  const [persons, setPersons] = useState([]);

  useEffect(()=>{
    personService
          .getAll()
          .then(initialPersons =>{
            console.log(initialPersons);
            setPersons(initialPersons);
          });
  },[]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState('');

  const onNameChange = (event) => setNewName(event.target.value);
  const onNumberChange = (event) => setNewNumber(event.target.value);
  const onNameFilterChange = (event) => setNameFilter(event.target.value);

  const addNewPerson = (event) =>{
    event.preventDefault();
    const currentPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if( currentPerson !== undefined)
    {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        const updatedPerson = {...currentPerson, number: newNumber};
        personService
                    .update(currentPerson.id, updatedPerson)
                    .then(returnedPerson => {
                      setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
                      setNotificationClass('success');
                      setNotificationMessage(`${newName} updated successfully`);
                      setTimeout(()=> setNotificationMessage(null),5000);
                    })
                    .catch(error => {
                      console.log(error);
                      const statusCode = Number(error.response.status);
                      let errorMessage = "Some error has occured. Please check your entries and try again";
                      if(statusCode === 404){
                        errorMessage = `Information on ${newName} has already been removed from the server`;
                        setPersons(persons.filter(person => person.id !== currentPerson.id))
                      }
                      else if(statusCode === 400){
                        errorMessage = error.response.data.error;
                      }
                      setNotificationClass('error');
                      setNotificationMessage(errorMessage);
                      setTimeout(()=> setNotificationMessage(null),5000);
                    });
      }
    } 
    else
    {
      const newPerson = {name: newName.trim(), number: newNumber};
      personService
                  .create(newPerson)
                  .then(returnedPerson =>{
                    console.log(returnedPerson);
                    setPersons(persons.concat(returnedPerson));
                    setNameFilter('');
                    setNotificationMessage(`${newName} added successfully`);
                    setNotificationClass('success');            
                    setTimeout(()=> setNotificationMessage(null),5000);
                  })
                  .catch(error =>{
                    setNameFilter('');
                    setNotificationMessage(`${error.response.data.error}`);
                    setNotificationClass('error');            
                    setTimeout(()=> setNotificationMessage(null),5000);
                  });
    } 
  }

  const onPersonDelete = (id) =>{
    const p = persons.find(per => per.id ===id);
    if(window.confirm(`Delete ${p.name}?`))
    {
      personService
                .deletePerson(id)
                .then(() => {
                  setPersons(persons.filter(person => person.id !== id))
                  setNotificationMessage(`${p.name} deleted successfully`);
                  setNotificationClass('error');            
                  setTimeout(()=> setNotificationMessage(null),5000);
                })
      
    }           
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} notificationClass={notificationClass}/>
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
      <Persons nameFilter={nameFilter} persons={persons} onPersonDelete={onPersonDelete}/>

    </div>
  )
}

export default App;