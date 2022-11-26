import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';
import { EUserRole } from '../../service/api';
import { useDispatch, useSelector, deleteUser } from '../../store';

// import styles from './login.module.scss';
import './users-page.scss';

// import { ButtonSubmit, InputEmail, InputPassword } from '../../components/ui';


export const UsersPage = () => {
    const dispatch = useDispatch();

    const { users, role } = useSelector(state => {
        return {
            users: state.users,
            role: state.role
        }
    })

    const isAdmin = role === EUserRole.ADMIN;

    const onDelete = (userId: string) => {
        dispatch(deleteUser(userId))
    }

    return (
        <div id="page-users" className="page">
            <div className="page-container">
                <table>
                    <tbody>
                        {users.map((userRecord) => (<tr>
                            <td>{userRecord.email}</td>
                            <td>{userRecord.name}</td>
                            <td>{userRecord.role}</td>
                            <td><Link to={'/users/' + userRecord._id}>Open</Link></td>
                            <td>{isAdmin ? <Button onClick={() => onDelete(userRecord._id)} label="delete" /> : null}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};