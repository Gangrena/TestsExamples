import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import RegularField from './shared/RegularField';

import { validate } from '../utils/validators/signup';
import { createAccount } from '../actions/account';

export class Signup extends Component {
  state = {
    surname: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: []
  }

  createAccount = () => {
    const validateResult = validate(this.state);

    this.setState({ errors: validateResult.errors });
    validateResult.isValid() && this.props.createAccount(this.state);
  }

  onChange = ({ target: { name, value } }) => (
    this.setState({ [name]: value })
  )

  onKeyPress = (event) => (event.key === 'Enter' && this.createAccount())

  getErrorMessage = (name) => (
    (_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  renderRegularField = (name, value, placeholder, type) => (
    <RegularField
      name={name}
      value={value}
      onChange={this.onChange}
      onKeyPress={this.onKeyPress}
      placeholder={placeholder}
      type={type}
      className="input"
      errorMessage={this.getErrorMessage(name)} />
  )

  render() {
    const { surname, name, email, password, passwordConfirmation } = this.state;

    return (
      <div>
        <h2>Sign Up</h2>
        {this.renderRegularField('surname', surname, 'Surname')}
        {this.renderRegularField('name', name, 'Name')}
        {this.renderRegularField('email', email, 'Email')}
        {this.renderRegularField('password', password, 'Password', 'password')}
        {this.renderRegularField('passwordConfirmation', passwordConfirmation, 'Confirm password', 'password')}
        <button onClick={this.createAccount} className="btn btn-primary full-width">Sign Up</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createAccount
}, dispatch);

Signup.propTypes = {
  createAccount: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Signup);
