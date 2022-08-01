const Filter = ({nameFilter,onChange}) => {
    return(
        <div>
            Names shown with the following filter: <input value={nameFilter} onChange={onChange}/>
        </div>
    )
}

export default Filter;