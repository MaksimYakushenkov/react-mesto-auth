import React from 'react';
import { Route, Switch, Link, withRouter, useHistory } from "react-router-dom";
import auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute ';
import InfoTooltip from "./InfoTooltip";
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
  const [infoData, setInfoData] = React.useState({
    path: "",
    img: "",
    text: ""
  });
  const [isDone, setIsDone] = React.useState(false);
  const history = useHistory();
  
  React.useEffect(() => {
    tokenCheck();
  }, []);

  function setLoggedIn() {
    setIsLoggedIn(true);
  }

  function handleCloseInfo() {
    setIsDone(false);
  }

  function openInfo(data) {
    setInfoData({
      path: data.path,
      img: data.img,
      text: data.text
    });
    setIsDone(true);
  }

  function handleSubmitLogin(email, password) {
    return  auth.authorize(password, email)
    .then((data) => {
      return data
    })
    .catch(err => console.log(err));
  }

  function handleSubmitRegister(email, password) {
    return  auth.register(password, email)
    .then((data) => {
      return data
    })
    .catch(err => console.log(err));
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      auth.getContent(jwt)
      .then((res) => {
        if (res){
          setUserEmail(res.data.email);
          setLoggedIn();
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
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
                <Register history={history} handleSubmitRegister={handleSubmitRegister} openInfo={openInfo} />
            </Route>
            <Route path="/sign-in">
              <Header>
                <Link to="/sign-up" className="header__link">Регистрация</Link>
              </Header>
              <Login handleLogin={setLoggedIn} setUserEmail={setUserEmail} handleSubmitLogin={handleSubmitLogin} history={history}/>
            </Route>
          </Switch>
          <InfoTooltip
            isDone={isDone}
            handleCloseInfo={handleCloseInfo}
            history={history}
            path={infoData.path}
            img={infoData.img}
            text={infoData.text}
          />
          {<Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App); 