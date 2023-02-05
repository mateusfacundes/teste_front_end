/*
import './App.css';
import NavBar from './components/NavBar'
import ShowSchouls from './pages/ShowSchouls';
import Login from './auth/Login';

function App() {
  return (
    <div className="App">
      <NavBar />
      <ShowSchouls />
      <Login />
    </div>
  );
}

export default App;
*/

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from './components/NavBar'


function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
	
	return (
		<React.Fragment>
      {isLoggedIn && <NavBar />}
			  <Outlet />
		</React.Fragment>
	);
}

export default App;