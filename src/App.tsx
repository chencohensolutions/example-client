import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './components/ui';

import { Navigator } from './routes';
import { useSelector, useDispatch, loginToken, logout } from './store';


const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const tokenExpired = useSelector(state => (state.tokenExpired))
  const isLoggedin = useSelector(state => (state.isLoggedin))


  useEffect(() => {
    if (tokenExpired && !(location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, tokenExpired]);

  useEffect(() => {
    dispatch(loginToken())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div id="page-wrapper">
      {isLoggedin && <Button onClick={onLogout} label='logout' />}
      <Navigator />
    </div>
  );
};

export default App;
