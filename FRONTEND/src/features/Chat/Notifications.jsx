import React, { useState } from 'react';
import Receiver from './Receiver';
import '../css/notifications.css'
import useAuth from '../../hooks/useAuth';

const Notifications = () => {
    const {data:messages,isLoading,isSuccess,isError,error}=useGetMessagesQuery()

    const {username}=useAuth()
let content
if (isLoading){
  content= <p>Is Loading...</p>
}
if(isSuccess){
  content= <Receiver  messages={messages} onClose={handleClose} />
}
if (isError){
  content= <p>{error.data.status}</p>
}

  
  return (
    <div className='body'>
    <div className='container'>
      <h1 className='heading'>Notifications</h1>
      
      <Receiver messages={messages} onClose={handleClose} user={username} />
    </div>
    </div>
  );
};

export default Notifications;
