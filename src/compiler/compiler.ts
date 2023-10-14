type Section = {
    startAddress: number,
    bytes: number[],
}

type Label = {
    name: string,
    address: number,
}

type Assembly = {
    sections: Section[],
    breakpoints: number[],
    labels: Label[],
}

const getRegisterAddress = (register: string): number => {
    switch (register) {
        case 'a':
            return 0b111
        case 'b':
            return 0b000
        case 'c':
            return 0b001
        case 'd':
            return 0b010
        case 'e':
            return 0b011
        case 'h':
            return 0b100
        case 'l':
            return 0b101
        case 'm':
            return 0b110
    }
    return 0;
}

const compile = (source: string): Assembly => {
    const lines = source.split("\n")

    const sections: Section[] = []
    var lastSectionId = -1;

    lines.forEach((line) => {
        line = line.toLowerCase()
        const lineTokens = line.match(/^([a-z]{2,4})([ ]+(.+))?$/)
        if (lineTokens != null) {
            const mnemonic = lineTokens[1]
            const args = (lineTokens[3]?.split(/,/) ?? []).map((arg) => arg.trim())

            switch (mnemonic) {
                case 'org':
                    sections.push({
                        startAddress: parseInt(args[0], 16),
                        bytes: [],
                    })
                    lastSectionId = sections.length - 1
                    break
                case 'nop':
                    sections[lastSectionId].bytes.push(0x00)
                    break
                case 'hlt':
                    sections[lastSectionId].bytes.push(0x76)
                    break
                case 'mov':
                    if (args[0] === 'a') {
                        sections[lastSectionId].bytes.push(0x98 | getRegisterAddress(args[1]))
                    }
                    if (args[0] === 'b') {
                        sections[lastSectionId].bytes.push(0x60 | getRegisterAddress(args[1]))
                    }
                    if (args[0] === 'c') {
                        sections[lastSectionId].bytes.push(0x68 | getRegisterAddress(args[1]))
                    }
                    if (args[0] === 'd') {
                        sections[lastSectionId].bytes.push(0x70 | getRegisterAddress(args[1]))
                    }
                    if (args[0] === 'e') {
                        sections[lastSectionId].bytes.push(0x78 | getRegisterAddress(args[1]))
                    }
                    if (args[0] === 'h') {
                        sections[lastSectionId].bytes.push(0x80 | getRegisterAddress(args[1]))
                    }
                    if (args[0] === 'l') {
                        sections[lastSectionId].bytes.push(0x88 | getRegisterAddress(args[1]))
                    }
                    if (args[0] === 'm') {
                        sections[lastSectionId].bytes.push(0x90 | getRegisterAddress(args[1]))
                    }
                    break
                case 'mvi':
                    if (args[0] === 'a') {
                        sections[lastSectionId].bytes.push(0x3e)
                    }
                    if (args[0] === 'b') {
                        sections[lastSectionId].bytes.push(0x06)
                    }
                    if (args[0] === 'c') {
                        sections[lastSectionId].bytes.push(0x0e)
                    }
                    if (args[0] === 'd') {
                        sections[lastSectionId].bytes.push(0x16)
                    }
                    if (args[0] === 'e') {
                        sections[lastSectionId].bytes.push(0x1e)
                    }
                    if (args[0] === 'h') {
                        sections[lastSectionId].bytes.push(0x26)
                    }
                    if (args[0] === 'l') {
                        sections[lastSectionId].bytes.push(0x2e)
                    }
                    if (args[0] === 'm') {
                        sections[lastSectionId].bytes.push(0x36)
                    }
                    break
            }
        }
    })

    return {
        sections: sections,
        breakpoints: [],
        labels: []
    }
}

export default compile