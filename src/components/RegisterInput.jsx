import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="auth-form">
      <input type="text" value={name} onChange={onNameChange} placeholder="Name" />
      <input type="text" value={email} onChange={onEmailChange} placeholder="Email" />
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <button type="button" onClick={() => register({ name, email, password })}>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
