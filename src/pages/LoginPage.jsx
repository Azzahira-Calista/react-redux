import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="auth-page">
      <h2>Login</h2>
      <LoginInput login={onLogin} />
      <p className="auth-page__register">
    Don't have an account? <Link to="/register" className="link">Register here</Link>
      </p>
    </section>

  );
}
