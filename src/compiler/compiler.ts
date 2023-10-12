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

const compile = (source: string): Assembly => {
    const lines = source.split("\n")

    const sections: Section[] = []

    lines.forEach((line) => {
        if (line.match(/org 0x([0-9a-f]{4})/)) {
            const org = line.match(/org 0x([0-9a-f]{4})/)
            if (org != null) {
                sections.push({
                    startAddress: parseInt(org[1], 16),
                    bytes: [],
                })
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