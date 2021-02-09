import React, { Component, useState } from 'react';
import logo from './../logo.svg';
import './../styles/App.css';
import { useMutation, gql } from '@apollo/client';

import { useHistory } from 'react-router';

const CREATE_SINGUP_MUTATION = gql`
mutation SignupMutation(
  $email: String!
  $password: String!
  $name: String!
) {
  signup(
    email: $email
    password: $password
    name: $name
  ) {
    token
  }
}
`;


const CreateUser = () => {

    const history = useHistory();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [inputName, setInputName] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [gotInfo, setGotInfo] = useState(false);

  const [createLink] = useMutation(CREATE_SINGUP_MUTATION, {
    variables: {
      email: userEmail,
      password: userPassword,
      name: userName
    }
  });

    const goTOLogin = () =>{
        history.push('/login')
    }


    const setInput = async () =>{
    setUserName(inputName)
    setUserEmail(inputEmail)
    setUserPassword(inputPassword)
    
    const gotInfo = await setGotInfo(true)
    try{
    createLink();
    } catch(error){
        console.log("network error")
    }
  }
  

  return (
    <div className="App">
        <div className = "container"> SOCIAL MEDIA APP</div>

      <div className ="container">
      <input value ={inputEmail} placeholder ="Email" onChange = {e => setInputEmail(e.target.value)}/>
      <input value ={inputPassword} placeholder ="password" onChange = {e => setInputPassword(e.target.value)}/>
      <input value ={inputName} placeholder = "name" onChange = {e => setInputName(e.target.value)}/>
      <button className= "buttonStyle" onClick = {setInput}> Sign Up </button>
      </div>

      <div>
          Have an acount Already?  
          <button className= "buttonStyle" onClick ={goTOLogin}>Login Page</button>
      </div>
      
      <div>
      {userName}
      {userEmail}
      {userPassword}
      </div>
      
    </div>
  );
}

export default CreateUser;
