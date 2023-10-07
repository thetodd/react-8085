import './App.css'
import AssemblerEditor from './CodeEditor'

function App() {
  return (
    <div id="shell">
      <div className="placeholder">
        Main Menu
      </div>
      <div className="row">
        <div className="placeholder">Register</div>
        <div className="placeholder">Flags</div>
      </div>
      <div className="row">
        <AssemblerEditor />
        <div className="placeholder">Memory</div>
      </div>
    </div>
  )
}

export default App
