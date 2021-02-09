import React, { Component, useState } from 'react';
import logo from './../logo.svg';
import './../styles/App.css';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
      user{
          name
      }
    }
  }
`;


const LoginPage = () =>{

    const history = useHistory();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [inputLoginEmail, setInputLoginEmail] = useState();
    const [inputLoginPassword, setInputLoginPassword] = useState();
    const [gotLoginInfo, setGotLoginInfo] = useState(false);
    const [gotAccess, setGotAccess]= useState(true)
    const [wrongInfo, setWrongInfo] = useState('');
    const [UserInfo, setUserInfo] = useState('')

    const setInput = async () =>{
        setEmail(inputLoginEmail)
        setPassword(inputLoginPassword)
        const Gotinfo = await setGotLoginInfo(true)
        try{
        const LoginResult = await login()
        //console.log(LoginResult)
        setGotAccess(false)
        
        //console.log('Welcome Back ' + LoginResult.data.login.user.name)
        setUserInfo('Welcome Back ' + LoginResult.data.login.user.name)
        }catch(error){
            setWrongInfo('either password or user name are inorrect!')
            console.log("either password or user name are inorrect!")
        }
        

    }

    const [login ,{data}] = useMutation(LOGIN_MUTATION, {
        variables: {
          email: Email,
          password: Password
        }
      });

    const PrintUserName = (dataInfo) =>{
        console.log(dataInfo);
        <div>hello {dataInfo}</div>
        //<div>hello {data.login.user.name}</div>
    }
      

    return(

<div>
        {gotAccess ?
        
    <div>
            Login page
        <div>
      <input value ={inputLoginEmail} placeholder ="Email" onChange = {e => setInputLoginEmail(e.target.value)}/>
      <input value ={inputLoginPassword} placeholder ="password" onChange = {e => setInputLoginPassword(e.target.value)}/>
      <button  onClick = {setInput}> Log In </button>
      {login}
        </div>
        {wrongInfo}
     </div>

     : <div> {UserInfo} </div>   }
</div>   

    )

}

export default LoginPage;