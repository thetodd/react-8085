import { CompileMnemonicFn, getRegisterAddress } from "./compiler";

const addressRegex = RegExp(/([0-9a-z]{2})([0-9a-z]{2})h/)

const extractAddressParts = (argument: string) => {
    const address = argument.match(addressRegex)

    if (address == null) {
        throw `Invalid address argument: ${argument}`
    }

    const highAddress = parseInt(address[1], 16)
    const lowAddress = parseInt(address[2], 16)

    return {
        highAddress,
        lowAddress,
    }
}

const nop: CompileMnemonicFn = () => {
    return { bytes: [0x00] }
}

const hlt: CompileMnemonicFn = () => {
    return { bytes: [0x76] }
}

const mov: CompileMnemonicFn = (args) => {
    if (args[0] === 'a') {
        return { bytes: [0x98 | getRegisterAddress(args[1])] }
    }
    if (args[0] === 'b') {
        return { bytes: [0x60 | getRegisterAddress(args[1])] }
    }
    if (args[0] === 'c') {
        return { bytes: [0x68 | getRegisterAddress(args[1])] }
    }
    if (args[0] === 'd') {
        return { bytes: [0x70 | getRegisterAddress(args[1])] }
    }
    if (args[0] === 'e') {
        return { bytes: [0x78 | getRegisterAddress(args[1])] }
    }
    if (args[0] === 'h') {
        return { bytes: [0x80 | getRegisterAddress(args[1])] }
    }
    if (args[0] === 'l') {
        return { bytes: [0x88 | getRegisterAddress(args[1])] }
    }
    if (args[0] === 'm') {
        return { bytes: [0x90 | getRegisterAddress(args[1])] }
    }
    throw `Unknown argument ${args[0]}`
}

const mvi: CompileMnemonicFn = (args) => {
    if (args[0] === 'a') {
        return { bytes: [0x3e, parseInt(args[1], 16)] }
    }
    if (args[0] === 'b') {
        return { bytes: [0x06, parseInt(args[1], 16)] }
    }
    if (args[0] === 'c') {
        return { bytes: [0x0e, parseInt(args[1], 16)] }
    }
    if (args[0] === 'd') {
        return { bytes: [0x16, parseInt(args[1], 16)] }
    }
    if (args[0] === 'e') {
        return { bytes: [0x1e, parseInt(args[1], 16)] }
    }
    if (args[0] === 'h') {
        return { bytes: [0x26, parseInt(args[1], 16)] }
    }
    if (args[0] === 'l') {
        return { bytes: [0x2e, parseInt(args[1], 16)] }
    }
    if (args[0] === 'm') {
        return { bytes: [0x36, parseInt(args[1], 16)] }
    }
    throw `Unknown argument ${args[0]}`
}

const lxi: CompileMnemonicFn = (args) => {
    if (args[0] === 'b') {
        return { bytes: [0x01, parseInt(args[1], 16)] }
    } else if (args[0] === 'd') {
        return { bytes: [0x11, parseInt(args[1], 16)] }
    } else if (args[0] === 'h') {
        return { bytes: [0x21, parseInt(args[1], 16)] }
    } else if (args[0] === 'sp') {
        return { bytes: [0x31, parseInt(args[1], 16)] }
    }

    throw `Register ${args[0]} not possible`
}

const inx: CompileMnemonicFn = (args) => {
    if (args[0] === 'b') {
        return { bytes: [0x03, parseInt(args[1], 16)] }
    } else if (args[0] === 'd') {
        return { bytes: [0x13, parseInt(args[1], 16)] }
    } else if (args[0] === 'h') {
        return { bytes: [0x23, parseInt(args[1], 16)] }
    } else if (args[0] === 'sp') {
        return { bytes: [0x33, parseInt(args[1], 16)] }
    }

    throw `Register ${args[0]} not possible`
}

const dcx: CompileMnemonicFn = (args) => {
    if (args[0] === 'b') {
        return { bytes: [0x0B, parseInt(args[1], 16)] }
    } else if (args[0] === 'd') {
        return { bytes: [0x1B, parseInt(args[1], 16)] }
    } else if (args[0] === 'h') {
        return { bytes: [0x2B, parseInt(args[1], 16)] }
    } else if (args[0] === 'sp') {
        return { bytes: [0x3B, parseInt(args[1], 16)] }
    }

    throw `Register ${args[0]} not possible`
}

const sta: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0x32, address.lowAddress, address.highAddress] }
}

const lda: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0x3a, address.lowAddress, address.highAddress] }
}

const stax: CompileMnemonicFn = ([registerPair]) => {
    if (registerPair === 'b') {
        return { bytes: [0x02] }
    } else if (registerPair === 'd') {
        return { bytes: [0x12] }
    }

    throw `Invalid register pair ${registerPair}`
}

const ldax: CompileMnemonicFn = ([registerPair]) => {
    if (registerPair === 'b') {
        return { bytes: [0x0A] }
    } else if (registerPair === 'd') {
        return { bytes: [0x1A] }
    }

    throw `Invalid register pair ${registerPair}`
}

const shld: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0x22, address.lowAddress, address.highAddress] }
}

const lhld: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0x2a, address.lowAddress, address.highAddress] }
}

const xchg: CompileMnemonicFn = () => {
    return { bytes: [0xeb] }
}

const push: CompileMnemonicFn = ([registerPair]) => {
    if (registerPair === 'b') {
        return { bytes: [0xc5] }
    } else if (registerPair === 'd') {
        return { bytes: [0xd5] }
    } else if (registerPair === 'h') {
        return { bytes: [0xe5] }
    } else if (registerPair === 'psw') {
        return { bytes: [0xf5] }
    } else {
        throw `Invalid register pair ${registerPair}`
    }
}

const pop: CompileMnemonicFn = ([registerPair]) => {
    if (registerPair === 'b') {
        return { bytes: [0xc1] }
    } else if (registerPair === 'd') {
        return { bytes: [0xd1] }
    } else if (registerPair === 'h') {
        return { bytes: [0xe1] }
    } else if (registerPair === 'psw') {
        return { bytes: [0xf1] }
    } else {
        throw `Invalid register pair ${registerPair}`
    }
}

const xthl: CompileMnemonicFn = () => {
    return { bytes: [0xe5] }
}

const sphl: CompileMnemonicFn = () => {
    return { bytes: [0xf9] }
}

const jmp: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xc3, address.lowAddress, address.highAddress] }
}

const jc: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xda, address.lowAddress, address.highAddress] }
}

const jnc: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xd2, address.lowAddress, address.highAddress] }
}

const jz: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xca, address.lowAddress, address.highAddress] }
}

const jp: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xf2, address.lowAddress, address.highAddress] }
}

const jm: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xfa, address.lowAddress, address.highAddress] }
}

const jpe: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xea, address.lowAddress, address.highAddress] }
}

const jpo: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xe2, address.lowAddress, address.highAddress] }
}

const jnz: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xc2, address.lowAddress, address.highAddress] }
}

const pchl: CompileMnemonicFn = () => {
    return { bytes: [0xe9] }
}

const call: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xcd, address.lowAddress, address.highAddress] }
}

const cc: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xdc, address.lowAddress, address.highAddress] }
}

const cnc: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xd4, address.lowAddress, address.highAddress] }
}

const cz: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xcc, address.lowAddress, address.highAddress] }
}

const cp: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xf4, address.lowAddress, address.highAddress] }
}

const cm: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xfc, address.lowAddress, address.highAddress] }
}

const cpe: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xec, address.lowAddress, address.highAddress] }
}

const cpo: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xe4, address.lowAddress, address.highAddress] }
}

const cnz: CompileMnemonicFn = (args) => {
    const address = extractAddressParts(args[0])
    return { bytes: [0xc4, address.lowAddress, address.highAddress] }
}

const ret: CompileMnemonicFn = () => {
    return { bytes: [0xc9] }
}

const rc: CompileMnemonicFn = () => {
    return { bytes: [0xd8] }
}

const rnc: CompileMnemonicFn = () => {
    return { bytes: [0xd0] }
}

const rz: CompileMnemonicFn = () => {
    return { bytes: [0xc8] }
}

const rnz: CompileMnemonicFn = () => {
    return { bytes: [0xc0] }
}

const rp: CompileMnemonicFn = () => {
    return { bytes: [0xf0] }
}

const rm: CompileMnemonicFn = () => {
    return { bytes: [0xf8] }
}

const rpe: CompileMnemonicFn = () => {
    return { bytes: [0xe8] }
}

const rpo: CompileMnemonicFn = () => {
    return { bytes: [0xe0] }
}

const availableMnemonics: { [k: string]: CompileMnemonicFn } = {
    nop, hlt, mov, mvi, lxi, sta, lda, stax, ldax, shld, lhld, xchg, push, pop, xthl, sphl, inx, dcx,
    jmp, jc, jm, jnc, jnz, jp, jpe, jpo, jz, pchl, call, cc, cm, cnc, cnz, cp, cpe, cpo, cz,
    rc, ret, rm, rnc, rnz, rp, rpe, rpo, rz,
}

export default availableMnemonics