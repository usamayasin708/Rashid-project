import {useEffect, useState} from "react"
import Routes from "./Routes";
import JWT from 'expo-jwt'
import {useHistory } from "react-router-dom";




function App() {
    const history = useHistory();
    const [isLoggedIn, saveLoggedIn] = useState();
    useEffect(() => {
        const key = 'tutorMeet';
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token')
        if (token && !isLoggedIn) {
          localStorage.setItem('token', token);
          let user = JWT.decode(token, key);
          user.user.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(user.user));
          saveLoggedIn(true)
          history.push('/')
        }
        
    },[]);

    return (
         <Routes />
    );
}

export default App;
