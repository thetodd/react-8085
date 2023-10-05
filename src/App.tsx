import './App.css'
import FlagsRegister from './widgets/FlagsRegister'
import RegisterView from './widgets/RegisterView'

function App() {
  return (
    <div id="shell">
      <div className="placeholder">
        Main Menu
      </div>
      <div className="row">
        <div className="placeholder">
        <div className="row">
          <RegisterView name="A" value="aa" color="#D40046" />
          <RegisterView name="B" value="34" />
          <RegisterView name="C" value="02" />
          <RegisterView name="D" value="d4" />
          <RegisterView name="H" value="23" />
          <RegisterView name="L" value="11" />
          </div>
        <div className="row">
          <RegisterView name="PC" color="#FFC15F" value="aa23" size='lg'/>
          <RegisterView name="SP" color="#FFC15F" value="3400" size='lg'/>
          </div>
        </div>
        <div className="placeholder">
          <FlagsRegister />
        </div>
      </div>
      <div className="row">
        <div id="codeeditor" className="placeholder">
          Codeeditor
        </div>
      </div>
    </div>
  )
}

export default App
