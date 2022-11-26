
import './index.scss';
export interface IButton {
    onClick: any,
    label: string,
    disabled?: boolean,
    className?: string
}

export const ButtonSubmit = ({ onClick, label, disabled = false, className = '' }: IButton) => {
    return <button className={"ui-button ui-button-submit " + className} disabled={disabled} onClick={onClick}>
        {label}
    </button>
}

export const ButtonLink = ({ onClick, label, disabled = false, className = '' }: IButton) => {
    return <button className={"ui-button ui-button-link" + className} disabled={disabled} onClick={onClick}>
        {label}
    </button>
}

export const Button = ({ onClick, label, disabled = false, className = '' }: IButton) => {
    return <button className={"ui-button" + className} disabled={disabled} onClick={onClick}>
        {label}
    </button>
}


export interface IInput {
    id: string,
    value: any,
    setValue: any,
    autoComplete?: false,
    disabled?: boolean,
    className?: string,
    placeholder?: string,
    name: string
}

export interface IInputText extends IInput {
    value: string
}

export const InputText = ({ setValue, value, disabled = false, className = '', placeholder = '', name, id, autoComplete = false }: IInputText) => {
    return <input
        id={id}
        disabled={disabled}
        className={'ui-input ui-input-text ' + className}
        type="text"
        autoComplete={(autoComplete) ? 'on' : 'new-password'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => (setValue(e.target.value))}
    />
}


export interface IInputEmail extends IInput {
    value: string
}

export const InputEmail = ({ setValue, value, disabled = false, className = '', placeholder = '', name, id, autoComplete = false }: IInputEmail) => {
    return <input
        id={id}
        disabled={disabled}
        className={'ui-input ui-input-email ' + className}
        type="email"
        autoComplete={(autoComplete) ? 'on' : 'new-password'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => (setValue(e.target.value))}
    />
}

export interface IInputPassword extends IInput {
    value: string
}

export const InputPassword = ({ setValue, value, disabled = false, className = '', placeholder = '', name, id, autoComplete = false }: IInputPassword) => {
    return <input
        id={id}
        disabled={disabled}
        className={'ui-input ui-input-password ' + className}
        type="password"
        autoComplete={(autoComplete) ? 'on' : 'new-password'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => (setValue(e.target.value))}
    />
}

interface IInputFile extends IInput {
    multiple?: boolean,
    accept: string
}

export const InputFiles = ({ setValue, disabled = false, className = '', placeholder = '', name, id, multiple = false }: IInputFile) => {
    return <div className='ui-input ui-input-files'>
        <label htmlFor={id}>{placeholder}</label>
        <input
            id={id}
            disabled={disabled}
            multiple={multiple}
            type="file"
            name={name}
            onChange={(e) => (setValue(e.target.files && e.target.files[0]))}
        />
    </div>
}

export interface IItem {
    id: number;
    value: string;
    name: string;
}

interface IInputSelect extends IInput {
    value: any;
    isNumber?: boolean;
    list: IItem[];
}

export const InputSelect = ({
    name,
    className,
    value,
    setValue,
    list,
    id,
    placeholder,
    isNumber = false,
}: IInputSelect) => (
    <select
        className={'ui-input ui-input-select ' + className}
        id={id}
        name={name}
        value={value}
        title={placeholder}
        onChange={event => {
            const value = isNumber ? parseInt(event.target.value) : event.target.value;
            setValue(value);
        }}>
        {list.map(item => (
            <option key={item.id} value={item.value}>
                {item.name}
            </option>
        ))}
    </select>
);

interface IForm {
    children: any;
    className?: string
}
export const Form = ({ children, className = '' }: IForm) => {
    const onSubmit = (e: any) => {
        e.preventDefault();
        return false
    }
    return <form onSubmit={onSubmit} method="post" className={'ui-form ' + className} autoComplete="new-password">
        {children}
    </form >
}