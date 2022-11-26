
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ButtonSubmit, Form, IItem, InputEmail, InputPassword, InputSelect, InputText } from '../../components/ui';
import { EUserRole, IUser } from '../../service/api';
import { useDispatch, useSelector, updateUser } from '../../store';
import './user-page.scss';

const rolesListTypes: IItem[] = [
    {
        id: 0,
        value: EUserRole.USER,
        name: "User"
    },
    {
        id: 1,
        value: EUserRole.ADMIN,
        name: "Admin"
    },
];

export const UserPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => {
        const findUser = state.users.find(({ _id }) => (_id === userId))
        const blankUser: IUser = { _id: '', name: '', email: '', role: EUserRole.USER }
        return (findUser) ? findUser as IUser : blankUser
    })
    const userRole = useSelector(state => state.role);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<EUserRole>(EUserRole.USER);
    const [password, setPassword] = useState('');

    const onReset = () => {
        setName(user.name);
        setEmail(user.email);
        setPassword('');
        setRole(user.role);
    }

    const onUpdate = () => {
        const { _id } = user;
        dispatch(updateUser({ _id, email, password, name, role }))

    }

    useEffect(() => {
        onReset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    return (
        <div id="page-users" className="page">
            <div className="page-container">
                <Form>
                    <InputEmail
                        id="user_email"
                        disabled={userRole === EUserRole.USER}
                        placeholder="Email"
                        name="user_email"
                        value={email}
                        setValue={setEmail}
                    />
                    <InputText
                        id="user_name"
                        disabled={userRole === EUserRole.USER}
                        placeholder="name"
                        autoComplete={false}
                        name="user_name"
                        value={name}
                        setValue={setName}
                    />
                    <InputSelect id="type" name="role" value={role} setValue={setRole} list={rolesListTypes} placeholder="Role" />
                    <InputPassword
                        id="user_password"
                        disabled={userRole === EUserRole.USER}
                        placeholder="Password"
                        name="user_password"
                        value={password}
                        setValue={setPassword}
                    />
                    <ButtonSubmit onClick={onUpdate} label="Update" />
                    <ButtonSubmit onClick={onReset} label="Reset" />
                </Form>
            </div>
        </div>
    );
};