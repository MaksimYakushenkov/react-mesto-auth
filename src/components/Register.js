import React from "react";
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip";
import infoOk from '../images/info_ok.svg';
import infoError from '../images/info_error.svg';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      isDone: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseInfo = this.handleCloseInfo.bind(this);
    
  }

  handleCloseInfo() {
    this.setState({isDone: false});
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
    const { email, password } = this.state;
      auth.register(password, email)
      .then((res) => {
        if(res){
          this.setState({
            message: 'Вы успешно зарегистрировались!',
            path: 'sign-in',
            isDone: true,
            img: infoOk
          })
        } else {
          this.setState({
            message: 'Что-то пошло не так! Попробуйте ещё раз.',
            path: 'sign-up',
            isDone: true,
            img: infoError
          })
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
        <InfoTooltip
        isDone={this.state.isDone}
        handleCloseInfo={this.handleCloseInfo}
        history={this.props.history}
        path={this.state.path}
        img={this.state.img}
        text={this.state.message}
        />
      </div>
    )
  }
}

export default withRouter(Register); 