import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react"
import CustomView from "./CustomView"
import { Route, Routes } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom'

it('Should return not found', async () => {
    const badRoute = '/custom/49234723846352321åäö3' //Route used for bad test, user should not exist
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
    const goodRoute = '/custom/esa' //Route used for good test, user should exist
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




