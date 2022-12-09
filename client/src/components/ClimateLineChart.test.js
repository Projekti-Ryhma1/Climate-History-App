import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, screen, waitFor } from "@testing-library/react"
import ClimateLineChart from './ClimateLineChart'


test('ClimateLineChart should be rendered', async () => {
    render(<ClimateLineChart/>)
    const tempChart = await waitFor(()=> screen.getByRole(/ClimateLineChart/i))
    expect(tempChart).toBeInTheDocument()
})
test('button should be rendered', async () => {
    render(<ClimateLineChart/>)
    const buttonInputEl =  await waitFor(()=> screen.getByRole(/button/i))
    expect(buttonInputEl).toBeInTheDocument()
})