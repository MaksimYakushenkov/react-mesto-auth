import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link, withRouter, useHistory } from "react-router-dom";
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute ';
import Login from './Login';
import Register from './Register';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn]  = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('Email here');
  const history = useHistory();
    
  React.useEffect(() => {
    tokenCheck();
  }, []);

  function setLoggedIn() {
    setIsLoggedIn(true);
  }

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      auth.getContent(jwt).then((res) => {
        if (res){
          setUserEmail(res.data.email);
          setLoggedIn();
          history.push("/");
        }
      }); 
    }
  } 
  
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>
            <ProtectedRoute
              exact path="/"
              isLoggedIn={isLoggedIn}
              component={Home}
              userEmail={userEmail}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              history={history}
            />
            <Route path="/sign-up">
                <Header>
                  <Link to="/sign-in" className="header__link">Войти</Link>
                </Header>
                <Register history={history} />
            </Route>
            <Route path="/sign-in">
              <Header>
                <Link to="/sign-up" className="header__link">Регистрация</Link>
              </Header>
              <Login handleLogin={setLoggedIn} history={history}/>
            </Route>
          </Switch>
          {/* 

          {<Footer />} */}
          {<Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App); 