import { useState } from 'react'
import './App.css'
import AssemblerEditor from './widgets/CodeEditor'
import FlagsRegister from './widgets/FlagsRegister'
import MemoryView from './widgets/MemoryView'
import RegisterView from './widgets/RegisterView'
import compile from './compiler/compiler'

function App() {
  const [editorValue, setValue] = useState('');
  const [startAddress, setStartAddress] = useState(0x2000);
  const [memoryCells, setMemoryCells] = useState([0x15, 0xab, 0x34]);
  const [sourceCode, setSourceCode] = useState("");
  
  const openFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const fileValue = await file.text();
    
    setValue(fileValue)
  }

  const assemble = () => {
    const assembly = compile(sourceCode)
    setMemoryCells(assembly.sections[0].bytes)
    setStartAddress(assembly.sections[0].startAddress)
  }

  return (
    <div id="shell">
      <div className="placeholder">
        <button onClick={openFile}>Open...</button>
        <button onClick={assemble}>Assemble...</button>
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
        <AssemblerEditor value={editorValue} onChange={setSourceCode} />
        <MemoryView startAddress={startAddress} cells={memoryCells}/>
      </div>
    </div>
  )
}

export default App
