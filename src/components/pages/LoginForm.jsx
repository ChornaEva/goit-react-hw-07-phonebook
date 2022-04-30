import { useDispatch } from 'react-redux';
import { logIn } from 'components/redux/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    // отправляем в редюсер значение екшена для обновления стора
    dispatch(logIn(form.elements.login.value));
    event.currentTarget.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="login" />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
