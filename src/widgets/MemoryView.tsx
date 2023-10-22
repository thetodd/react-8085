import './MemoryView.css'

type MemoryCell = number

type MemoryViewProps = {
    startAddress: number,
    cells: MemoryCell[],
}

const MemoryView = ({startAddress, cells = []}: MemoryViewProps) => {

    const toHex = (num: number, length = 2) => `0x${num.toString(16).padStart(length,"0")}`

    const memoryData = cells;
    const chunkSize = 16
    let memoryCells = []
    for (let i = 0; i < memoryData.length; i += chunkSize) {
        const chunk = memoryData.slice(i, i + chunkSize);
        // do whatever
        const row = chunk.map((item) => <td>{toHex(item)}</td>)
        memoryCells.push([row])
    }

    return <div className="placeholder">
        <table id="memorytable">
            <tbody>
                <tr>
                    <th>&nbsp;</th>
                    <th>0x00</th>
                    <th>0x01</th>
                    <th>0x02</th>
                    <th>0x03</th>
                    <th>0x04</th>
                    <th>0x05</th>
                    <th>0x06</th>
                    <th>0x07</th>
                    <th>0x08</th>
                    <th>0x09</th>
                    <th>0x0A</th>
                    <th>0x0B</th>
                    <th>0x0C</th>
                    <th>0x0D</th>
                    <th>0x0E</th>
                    <th>0x0F</th>
                </tr>
                {memoryCells.map((row, index) => <tr><th>{toHex(startAddress + index * 16, 4)}</th>{row}</tr>)}
            </tbody>
        </table>
    </div>
}

export default MemoryView