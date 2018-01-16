import React from 'react';
import { shallow } from 'enzyme';
import {Signup} from './Signup';
import RegularField from './shared/RegularField';

describe('<Signup>', () => {
  const createAccount = jest.fn();
  const wrapper = shallow(<Signup
    createAccount={createAccount}/>);

  it('should have a header called \Sign Up\'',() => {
    const actual = wrapper.find('h2').text();
    const expected = 'Sign Up';

    expect(actual).toEqual(expected);
  });

  it('should contain <RegularField/> components', () => {
    const allInputs = wrapper.find(RegularField);
    expect(allInputs.length).toEqual(5);

    expect(allInputs.at(0).props().name).toEqual('surname');
    expect(allInputs.at(0).props().value).toEqual('');

    expect(allInputs.at(1).props().name).toEqual('name');
    expect(allInputs.at(1).props().value).toEqual('');

    expect(allInputs.at(2).props().name).toEqual('email');
    expect(allInputs.at(2).props().value).toEqual('');

    expect(allInputs.at(3).props().name).toEqual('password');
    expect(allInputs.at(3).props().value).toEqual('');

    expect(allInputs.at(4).props().name).toEqual('passwordConfirmation');
    expect(allInputs.at(4).props().value).toEqual('');
  });

  it('should validate form and set errors when click sign up button', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.state('errors').length).toEqual(5);
  });

  it('should not fire createAccount function when state got errors', () => {
    wrapper.find('button').simulate('click');
    expect(createAccount).not.toBeCalled();

  });

  it('should change state when input changes', () => {
    wrapper.find({name: 'surname'}).simulate('change', {target: {name: 'surname', value: 'Blaze'}});
    expect(wrapper.state('surname')).toBe('Blaze');

    wrapper.find({name: 'name'}).simulate('change', {target: {name: 'name', value: 'Bob'}});
    expect(wrapper.state('name')).toBe('Bob');
  });

  it('should validate email syntax after click sign up button', () => {
    wrapper.find({name: 'email'})
      .simulate('change', {target: {name: 'email', value: 'wrongEmail'}});

    wrapper.find('button').simulate('click');

    expect((wrapper.state('errors')
      .find(e => e.attribute === 'email') || { message: ''}).message)
      .toBe('please provide a valid email address');

    wrapper.find({name: 'email'})
      .simulate('change', {target: {name: 'email', value: 'myEmail@gmail.com'}});

    wrapper.find('button').simulate('click');

    expect((wrapper.state('errors')
      .find(e => e.attribute === 'email') || { message: ''}).message).toBe('');

  });

  it('should require password length', () => {
    wrapper.find({name: 'password'})
      .simulate('change', {target: {name: 'password', value: '1234567'}});

    wrapper.find('button').simulate('click');

    expect((wrapper.state('errors')
      .find(e => e.attribute === 'password') || { message: ''}).message)
      .toBe('password must be at least 8 characters');


    wrapper.find({name: 'password'})
      .simulate('change', {target: {name: 'password', value: '12345678'}});

    wrapper.find('button').simulate('click');

    expect((wrapper.state('errors')
        .find(e => e.attribute === 'password') || { message: ''}).message).toBe('');
  });

  it('should password confirmation equal to password', () => {
    wrapper.find({name: 'passwordConfirmation'})
      .simulate('change', {target: {name: 'passwordConfirmation', value: '1234567'}});

    wrapper.find('button').simulate('click');

    expect((wrapper.state('errors')
      .find(e => e.attribute === 'passwordConfirmation') || { message: ''}).message)
      .toBe('password confirmation must match password');

    wrapper.find({name: 'passwordConfirmation'})
      .simulate('change', {target: {name: 'passwordConfirmation', value: '12345678'}});

    wrapper.find('button').simulate('click');

    expect((wrapper.state('errors')
      .find(e => e.attribute === 'passwordConfirmation') || { message: ''}).message)
      .toBe('');
  });

  it('should handle sign up button when form is valid', () => {
    expect(createAccount).toBeCalledWith(wrapper.state());
  });
});
