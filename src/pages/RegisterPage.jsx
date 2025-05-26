import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <section className="login-page">
      <RegisterInput register={onRegister} />
      <p className="login-page__register">
        Already have an account?{' '}
        <Link to="/register" className="link">
          Login here
        </Link>
      </p>
    </section>
  );
}
