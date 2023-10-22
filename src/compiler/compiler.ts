import CompilerFunctions from './compilerFunctions'

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

export type CompileResult = {
    bytes: number[],
}

export type CompileMnemonicFn = (args: string[]) => CompileResult

export const getRegisterAddress = (register: string): number => {
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
    throw `Unknown register ${register}`
}

const compile = (source: string): Assembly => {
    const lines = source.split("\n")

    const sections: Section[] = []
    let lastSectionId = -1;

    lines.forEach((line) => {
        line = line.toLowerCase()
        const lineTokens = line.match(/^([a-z]{2,4})([ ]+(.+))?$/)
        if (lineTokens != null) {
            const mnemonic = lineTokens[1]
            const args = (lineTokens[3]?.split(/,/) ?? []).map((arg) => arg.trim())

            if (Object.keys(CompilerFunctions).includes(mnemonic)) {
                CompilerFunctions[mnemonic](args).bytes.forEach((byte) => sections[lastSectionId].bytes.push(byte))
            }

            if(mnemonic === 'org') {
                sections.push({
                    startAddress: parseInt(args[0], 16),
                    bytes: [],
                })
                lastSectionId = sections.length - 1
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