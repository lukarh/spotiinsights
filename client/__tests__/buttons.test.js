import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { act, render, cleanup, fireEvent } from "@testing-library/react";

import LoginButton from '../src/components/FunctionalComponents/LoginButton';
import LogoutButton from '../src/components/FunctionalComponents/LogoutButton';
import RecommendButton from '../src/components/FunctionalComponents/RecommendButton';

jest.mock('axios') 

describe('Login Button Component', () => {
    const loginButtonLabel = "Login to Spotify"
    let hrefMock = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()

        delete window.location
        window.location = { href: '' }
    })

    afterEach(() => {
        cleanup()
        window.location = { href: hrefMock }
    })

    test('should render the login button with correct label', () => {
        const { getByText } = render(<LoginButton />)
        const loginButton = getByText(loginButtonLabel)
        expect(loginButton).toBeInTheDocument()
    })

    test('should call API login endpoint and get a response', async () => {
        const mockResponse = { status: 200, data: { redirectURL: 'https://www.google.com' }}
        axios.get.mockResolvedValue(mockResponse)

        const { getByText } = render(<LoginButton />)
        const loginButton = getByText(loginButtonLabel)

        await act(async () => {
            fireEvent.click(loginButton)
        })
        
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/auth/login', { withCredentials: true })
        expect(mockResponse.data).toHaveProperty('redirectURL')
        expect(mockResponse.status).toBe(200)
    })

    test('should call API login endpoint and fail', async () => {
        const mockResponse = { status: 500, data: {} }
        const message = "Failed to start Spotify OAuth."
        axios.get.mockRejectedValueOnce(new Error(message))

        const { getByText } = render(<LoginButton />)
        const loginButton = getByText(loginButtonLabel)

        await act(async () => {
            fireEvent.click(loginButton)
        })

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/auth/login', { withCredentials: true })
        expect(mockResponse.data).not.toHaveProperty('redirectURL')
        expect(mockResponse.status).toBe(500)
    })

    test('should match snapshot', () => {
        const tree = renderer.create(<LoginButton />).toJSON()
        expect(tree).toMatchSnapshot()
    })

})

describe('Logout Button Component', () => {
    const logoutButtonLabel = "Logout"

    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterEach(() => {
        cleanup()
    })

    test('should render the logout button with correct label', () => {
        const { getByText } = render(<LogoutButton />)
        const logoutButton = getByText(logoutButtonLabel)
        expect(logoutButton).toBeInTheDocument()
    })

    test('should call API logout endpoint and get a response', async () => {
        const mockResponse = { status: 200, data: { redirectURL: 'https://www.google.com' }}
        axios.get.mockResolvedValue(mockResponse)

        const { getByText } = render(<LogoutButton />)
        const logoutButton = getByText(logoutButtonLabel)

        await act(async () => {
            fireEvent.click(logoutButton)
        })
        
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/auth/logout', { withCredentials: true })
        expect(mockResponse.data).toHaveProperty('redirectURL')
        expect(mockResponse.status).toBe(200)
    })

    test('should call API logout endpoint and fail', async () => {
        const mockResponse = { status: 500, data: {} }
        const message = "Failed to logout of session."
        axios.get.mockRejectedValueOnce(new Error(message))

        const { getByText } = render(<LogoutButton />)
        const logoutButton = getByText(logoutButtonLabel)

        await act(async () => {
            fireEvent.click(logoutButton)
        })

        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/auth/logout', { withCredentials: true })
        expect(mockResponse.data).not.toHaveProperty('redirectURL')
        expect(mockResponse.status).toBe(500)
    })

    test('should match snapshot', () => {
        const tree = renderer.create(<LogoutButton />).toJSON()
        expect(tree).toMatchSnapshot()
    })

})

describe('Recommend Button Component', () => {
    const recommendButtonLabel = "Get Song Recommendations"

    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterEach(() => {
        cleanup()
    })

    const getSongRecommendations = async (event) => {
        try {
            const searchResults = await axios.get(
                `http://localhost:5000/api/spotify/song-recommendations`, { withCredentials: true }
            )
        } catch (error) {
            // do nothing with the error 
        }
    }

    test('should render the recommend songs button with correct label', () => {
        
        const { getByRole } = render(<RecommendButton />)
        const recommendButton = getByRole('button')

        expect(recommendButton).toBeInTheDocument()
    })

    test('should call API recommendations endpoint and get a response', () => {
        const mockResponse = { status: 200, data: { items: [{ id: 1, track: "hello" }, { id: 2, track: "bye" }] } }
        axios.get.mockResolvedValue(mockResponse)

        const { getByRole } = render(<RecommendButton handleSubmit={getSongRecommendations}/>)
        const recommendButton = getByRole('button')

        act(() => {
            fireEvent.click(recommendButton)
        })

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/spotify/song-recommendations', { withCredentials: true })
        expect(mockResponse.data).toHaveProperty('items')
        expect(mockResponse.status).toBe(200)
    })

    test('should call API recommendations endpoint and fail', () => {
        const mockResponse = { status: 500, data: {} }
        const message = "Failed to get recommended songs."
        axios.get.mockRejectedValueOnce(new Error(message))

        const { getByText } = render(<RecommendButton handleSubmit={getSongRecommendations}/>)
        const recommendButton = getByText(recommendButtonLabel)

        act(() => {
            fireEvent.click(recommendButton)
        })

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/spotify/song-recommendations', { withCredentials: true })
        expect(mockResponse.data).not.toHaveProperty("items")
        expect(mockResponse.status).toBe(500)
    })

    test('should match snapshot', () => {
        const tree = renderer.create(<RecommendButton />).toJSON()
        expect(tree).toMatchSnapshot()
    })

})

