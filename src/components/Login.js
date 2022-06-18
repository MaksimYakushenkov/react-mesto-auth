import React from "react";
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      done: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    if (!this.state.email || !this.state.password){
      return;
    }

    this.props.handleSubmitLogin(this.state.email, this.state.password)
    .then((data) => {
      if (data){
        this.props.setUserEmail(this.state.email);
        this.setState({email: '', password: ''} ,() => {
            this.props.handleLogin();
            this.props.history.push('/');
        })
        localStorage.setItem('jwt', data.token);
      } else {
        return
      }
    });
}
  
  render() {
    return(
      <div className="login">
        <p className="login__header">Войти</p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <input id="email" className="login__input" required name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          <input id="password" className="login__input" required name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChange} />
          <button type="submit" className="login__button">Войти</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login); 
