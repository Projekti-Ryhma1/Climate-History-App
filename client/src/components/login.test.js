import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, screen } from "@testing-library/react"
import Login from "./login"

test('username input should be rendered', () => {
    render(<Login/>)
    const userInputEl = screen.getByPlaceholderText(/username/i)
    expect(userInputEl).toBeInTheDocument()
})
test('password input should be rendered', () => {
    render(<Login/>)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    expect(passwordInputEl).toBeInTheDocument()
})
test('button should be rendered', () => {
    render(<Login/>)
    const buttonInputEl = screen.getByRole(/button/i)
    expect(buttonInputEl).toBeInTheDocument()
})
test('username input should be empty', () => {
    render(<Login/>)
    const userInputEl = screen.getByPlaceholderText(/username/i)
    expect(userInputEl.value).toBe("")
})
test('password input should be empty', () => {
    render(<Login/>)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    expect(passwordInputEl.value).toBe("")
})
test('username input should change', () => {
    render(<Login/>)
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const testValue = "test"

    fireEvent.change(userInputEl,{target:{value:testValue}})
    expect(userInputEl.value).toBe(testValue)
})
test('username input should change', () => {
    render(<Login/>)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    const testValue = "test"

    fireEvent.change(passwordInputEl,{target:{value:testValue}})
    expect(passwordInputEl.value).toBe(testValue)
})