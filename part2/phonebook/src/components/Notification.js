const Notification = ({message,notificationClass}) =>{
    console.log(notificationClass)
    if(message === null)
        return null;
    return(
        <div className={notificationClass}>
            {message}
        </div>
    )
}

export default Notification;