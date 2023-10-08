import './RegisterView.css'

type RegisterViewProps = {
    name: string,
    value: string,
    color?: string,
    size?: "sm"|"lg"
}

const RegisterView = ({name, value, color = '#c2c2c2', size = 'sm'}: RegisterViewProps) => {
    return <div className="register"><div>Register {name}</div><div className="register-value" style={{color: color, width: size == "lg" ? '150px' : '50px'}}>0x{value.toUpperCase()}</div></div>
}

export default RegisterView