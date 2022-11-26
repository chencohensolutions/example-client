import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/login';
import UsersPage from '../pages/users';
import UserPage from '../pages/user';


export const Navigator = () => (
	<Routes>
		<Route path="/login" element={<LoginPage />} />
		<Route path="/users" element={<UsersPage />} />
		<Route path="/users/:userId" element={<UserPage />} />
	</Routes>)
