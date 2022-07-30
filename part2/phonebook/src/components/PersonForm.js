const PersonForm = ({onSubmit,newName,onNameChange,newNumber,onNumberChange}) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
                Name: <input value={newName} onChange={onNameChange} />
            </div>
            <div>
                Number: <input value={newNumber} onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm;