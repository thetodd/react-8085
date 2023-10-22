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

test('it should compile nop in correct section', () => {
    const assembly = compile("org 0x0000\nnop");

    expect(assembly.sections[0].bytes.length).toBe(1)
    expect(assembly.sections[0].bytes[0]).toBe(0x00)
})

test('it should compile hlt in correct section', () => {
    const assembly = compile("org 0x0000\nhlt");

    expect(assembly.sections[0].bytes.length).toBe(1)
    expect(assembly.sections[0].bytes[0]).toBe(0x76)
})

test('it should trim argument list', () => {
    const assembly = compile("org 0x0000\nmov a , b ");

    expect(assembly.sections[0].bytes.length).toBe(1)
    expect(assembly.sections[0].bytes[0]).toBe(0x98)
})

test('it should compile mov a,r mnemonic group', () => {
    const assembly = compile("org 0x0000\nmov a,b\nmov a,c\nmov a,d\nmov a,e\nmov a,h\nmov a,l\nmov a,m\nmov a,a")

    expect(assembly.sections[0].bytes.length).toBe(8)
    expect(assembly.sections[0].bytes[0]).toBe(0x98)
    expect(assembly.sections[0].bytes[1]).toBe(0x99)
    expect(assembly.sections[0].bytes[2]).toBe(0x9a)
    expect(assembly.sections[0].bytes[3]).toBe(0x9b)
    expect(assembly.sections[0].bytes[4]).toBe(0x9c)
    expect(assembly.sections[0].bytes[5]).toBe(0x9d)
    expect(assembly.sections[0].bytes[6]).toBe(0x9e)
    expect(assembly.sections[0].bytes[7]).toBe(0x9f)
})

test('it should compile mov b,r mnemonic group', () => {
    const assembly = compile("org 0x0000\nmov b,b\nmov b,c\nmov b,d\nmov b,e\nmov b,h\nmov b,l\nmov b,m\nmov b,a")

    expect(assembly.sections[0].bytes.length).toBe(8)
    expect(assembly.sections[0].bytes[0]).toBe(0x60)
    expect(assembly.sections[0].bytes[1]).toBe(0x61)
    expect(assembly.sections[0].bytes[2]).toBe(0x62)
    expect(assembly.sections[0].bytes[3]).toBe(0x63)
    expect(assembly.sections[0].bytes[4]).toBe(0x64)
    expect(assembly.sections[0].bytes[5]).toBe(0x65)
    expect(assembly.sections[0].bytes[6]).toBe(0x66)
    expect(assembly.sections[0].bytes[7]).toBe(0x67)
})

test('it should compile mov c,r mnemonic group', () => {
    const assembly = compile("org 0x0000\nmov c,b\nmov c,c\nmov c,d\nmov c,e\nmov c,h\nmov c,l\nmov c,m\nmov c,a")

    expect(assembly.sections[0].bytes.length).toBe(8)
    expect(assembly.sections[0].bytes[0]).toBe(0x68)
    expect(assembly.sections[0].bytes[1]).toBe(0x69)
    expect(assembly.sections[0].bytes[2]).toBe(0x6a)
    expect(assembly.sections[0].bytes[3]).toBe(0x6b)
    expect(assembly.sections[0].bytes[4]).toBe(0x6c)
    expect(assembly.sections[0].bytes[5]).toBe(0x6d)
    expect(assembly.sections[0].bytes[6]).toBe(0x6e)
    expect(assembly.sections[0].bytes[7]).toBe(0x6f)
})

test('it should compile mov d,r mnemonic group', () => {
    const assembly = compile("org 0x0000\nmov d,b\nmov d,c\nmov d,d\nmov d,e\nmov d,h\nmov d,l\nmov d,m\nmov d,a")

    expect(assembly.sections[0].bytes.length).toBe(8)
    expect(assembly.sections[0].bytes[0]).toBe(0x70)
    expect(assembly.sections[0].bytes[1]).toBe(0x71)
    expect(assembly.sections[0].bytes[2]).toBe(0x72)
    expect(assembly.sections[0].bytes[3]).toBe(0x73)
    expect(assembly.sections[0].bytes[4]).toBe(0x74)
    expect(assembly.sections[0].bytes[5]).toBe(0x75)
    expect(assembly.sections[0].bytes[6]).toBe(0x76)
    expect(assembly.sections[0].bytes[7]).toBe(0x77)
})

test('it should compile mov e,r mnemonic group', () => {
    const assembly = compile("org 0x0000\nmov e,b\nmov e,c\nmov e,d\nmov e,e\nmov e,h\nmov e,l\nmov e,m\nmov e,a")

    expect(assembly.sections[0].bytes.length).toBe(8)
    expect(assembly.sections[0].bytes[0]).toBe(0x78)
    expect(assembly.sections[0].bytes[1]).toBe(0x79)
    expect(assembly.sections[0].bytes[2]).toBe(0x7a)
    expect(assembly.sections[0].bytes[3]).toBe(0x7b)
    expect(assembly.sections[0].bytes[4]).toBe(0x7c)
    expect(assembly.sections[0].bytes[5]).toBe(0x7d)
    expect(assembly.sections[0].bytes[6]).toBe(0x7e)
    expect(assembly.sections[0].bytes[7]).toBe(0x7f)
})

test('it should compile mov h,r mnemonic group', () => {
    const assembly = compile("org 0x0000\nmov h,b\nmov h,c\nmov h,d\nmov h,e\nmov h,h\nmov h,l\nmov h,m\nmov h,a")

    expect(assembly.sections[0].bytes.length).toBe(8)
    expect(assembly.sections[0].bytes[0]).toBe(0x80)
    expect(assembly.sections[0].bytes[1]).toBe(0x81)
    expect(assembly.sections[0].bytes[2]).toBe(0x82)
    expect(assembly.sections[0].bytes[3]).toBe(0x83)
    expect(assembly.sections[0].bytes[4]).toBe(0x84)
    expect(assembly.sections[0].bytes[5]).toBe(0x85)
    expect(assembly.sections[0].bytes[6]).toBe(0x86)
    expect(assembly.sections[0].bytes[7]).toBe(0x87)
})

test('it should compile mov l,r mnemonic group', () => {
    const assembly = compile("org 0x0000\nmov l,b\nmov l,c\nmov l,d\nmov l,e\nmov l,h\nmov l,l\nmov l,m\nmov l,a")

    expect(assembly.sections[0].bytes.length).toBe(8)
    expect(assembly.sections[0].bytes[0]).toBe(0x88)
    expect(assembly.sections[0].bytes[1]).toBe(0x89)
    expect(assembly.sections[0].bytes[2]).toBe(0x8a)
    expect(assembly.sections[0].bytes[3]).toBe(0x8b)
    expect(assembly.sections[0].bytes[4]).toBe(0x8c)
    expect(assembly.sections[0].bytes[5]).toBe(0x8d)
    expect(assembly.sections[0].bytes[6]).toBe(0x8e)
    expect(assembly.sections[0].bytes[7]).toBe(0x8f)
})

test('it should compile mov m,r mnemonic group', () => {
    const assembly = compile("org 0x0000\nmov m,b\nmov m,c\nmov m,d\nmov m,e\nmov m,h\nmov m,l\nmov m,m\nmov m,a")

    expect(assembly.sections[0].bytes.length).toBe(8)
    expect(assembly.sections[0].bytes[0]).toBe(0x90)
    expect(assembly.sections[0].bytes[1]).toBe(0x91)
    expect(assembly.sections[0].bytes[2]).toBe(0x92)
    expect(assembly.sections[0].bytes[3]).toBe(0x93)
    expect(assembly.sections[0].bytes[4]).toBe(0x94)
    expect(assembly.sections[0].bytes[5]).toBe(0x95)
    expect(assembly.sections[0].bytes[6]).toBe(0x96)
    expect(assembly.sections[0].bytes[7]).toBe(0x97)
})

test('it should compile mvi r mnemonic group', () => {
    const assembly = compile("org 0x0000\nmvi b, 0x45\nmvi c, 0x45\nmvi d, 0x45\nmvi e, 0x45\nmvi h, 0x45\nmvi l, 0x45\nmvi m, 0x45\nmvi a, 0x45")

    expect(assembly.sections[0].bytes.length).toBe(16)
    expect(assembly.sections[0].bytes[0]).toBe(0x06)
    expect(assembly.sections[0].bytes[1]).toBe(0x45)
    expect(assembly.sections[0].bytes[2]).toBe(0x0e)
    expect(assembly.sections[0].bytes[3]).toBe(0x45)
    expect(assembly.sections[0].bytes[4]).toBe(0x16)
    expect(assembly.sections[0].bytes[5]).toBe(0x45)
    expect(assembly.sections[0].bytes[6]).toBe(0x1e)
    expect(assembly.sections[0].bytes[7]).toBe(0x45)
    expect(assembly.sections[0].bytes[8]).toBe(0x26)
    expect(assembly.sections[0].bytes[9]).toBe(0x45)
    expect(assembly.sections[0].bytes[10]).toBe(0x2e)
    expect(assembly.sections[0].bytes[11]).toBe(0x45)
    expect(assembly.sections[0].bytes[12]).toBe(0x36)
    expect(assembly.sections[0].bytes[13]).toBe(0x45)
    expect(assembly.sections[0].bytes[14]).toBe(0x3e)
    expect(assembly.sections[0].bytes[15]).toBe(0x45)
})