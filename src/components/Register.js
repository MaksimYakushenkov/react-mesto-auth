import React from "react";
import { Link, withRouter } from 'react-router-dom';
import infoOk from '../images/info_ok.svg';
import infoError from '../images/info_error.svg';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
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
    this.props.handleSubmitRegister( this.state.email, this.state.password)
    .then((res) => {
      if(res){
        this.props.openInfo({
          text: 'Вы успешно зарегистрировались!',
          path: 'sign-in',
          img: infoOk
        });
      } else {
        this.props.openInfo({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          path: 'sign-up',
          img: infoError
        });
      }
    });
  }
  
  render(){
    return(
      <div className="register">
        <p className="register__header">Регистрация</p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <input id="email" className="register__input" required name="email" type="email"  placeholder="Email" value={this.state.username} onChange={this.handleChange} />
          <input id="password" className="register__input" required name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChange} />
          <button type="submit" className="register__button">Зарегистрироваться</button>
        </form>
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register__link">Войти</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Register); 