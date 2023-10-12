import { test, expect } from '@playwright/test'
import compile from '../../src/compiler/compiler'

test('empty source leads into empty assembly', () => {
    const assembly = compile('')

    expect(assembly.sections.length).toBe(0)
})

test('assembly section has start address from org directive', () => {
    const assembly = compile("org 0x1800\nldi 0x23")

    expect(assembly.sections.length).toBe(1)
    expect(assembly.sections[0].startAddress).toBe(0x1800)
})

test('assembly section can have multiple sections', () => {
    const assembly = compile("org 0x1800\nldi 0x23\norg 0x2000\nldi 0x00")

    expect(assembly.sections.length).toBe(2)
    expect(assembly.sections[0].startAddress).toBe(0x1800)
    expect(assembly.sections[1].startAddress).toBe(0x2000)
})
