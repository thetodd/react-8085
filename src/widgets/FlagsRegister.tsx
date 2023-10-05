import './FlagsRegister.css'

const FlagsRegister = () => {
    return <>
        <div className="flags-title">
            Flags-Register
        </div>
        <div className="flags-row">
            <span>S</span>
            <span>Z</span>
            <span>AC</span>
            <span>P</span>
            <span>C</span>
        </div>
        <div className="flags-row">
            <span>⛔️</span>
            <span>⛔️</span>
            <span>✅</span>
            <span>✅</span>
            <span>⛔️</span>
        </div>
    </>
}

export default FlagsRegister