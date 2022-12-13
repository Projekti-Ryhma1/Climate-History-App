import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from "@testing-library/react"
import CustomView from "./CustomView"
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom'
import { act } from 'react-dom/test-utils';

/* test('not found should be rendered', () => {
    const container = render(<CustomView/>)
    screen.debug();

    expect(container.getAllByDisplayValue("Not found"))
}) */
it('Should return not found', async () => {
    const badRoute = '/custom/49234723846352'
        render(
            <MemoryRouter initialEntries={[badRoute]}>
                <Routes>
                    <Route path="/custom/:username" element={<CustomView/>} />
                </Routes>
          </MemoryRouter>,
        );

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
    screen.debug();
});

it('Should render custom page of esa', async () => {
    const goodRoute = '/custom/esa'
        render(
            <MemoryRouter initialEntries={[goodRoute]}>
                <Routes>
                    <Route path="/custom/:username" element={<CustomView/>} />
                </Routes>
          </MemoryRouter>,
        );
    screen.debug();
    expect(await screen.findByText('Custom view of esa')).toBeInTheDocument();
});




