import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { act, render, cleanup, fireEvent } from "@testing-library/react";
import mockRecentPlaylistData from '../__testsData__/mockRecentPlaylistData';
import MusicPagination from '../src/components/FunctionalComponents/MusicPagination';

describe('Music Pagination Component', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterEach(() => {
        cleanup()
    })

    const itemsPerPage = 7
    const mockHandlePageChange = jest.fn()

    test('should render the pagination component regardless of no input array data and itemsPerPage (7) set statically', async () => {
        const mockData = []
        const currentPage = 0

        const { getByRole } = render(
            <MusicPagination recentPlaylist={mockData} itemsPerPage={itemsPerPage} currentPage={currentPage} onChange={mockHandlePageChange} />
        )
        
        const firstPageButton = getByRole('button', { name: 'Go to first page' })
        const previousPageButton = getByRole('button', { name: 'Go to previous page' })
        const nextPageButton = getByRole('button', { name: 'Go to next page' })
        const lastPageButton = getByRole('button', { name: 'Go to last page' })

        expect(firstPageButton).toBeInTheDocument()
        expect(previousPageButton).toBeInTheDocument()
        expect(nextPageButton).toBeInTheDocument()
        expect(lastPageButton).toBeInTheDocument()
        expect(mockHandlePageChange).not.toHaveBeenCalled()
    })

    test('should render the pagination component with correct no. of pages for a given input array (length 50) and itemsPerPage (7) set statically', async () => {
        const currentPage = 1

        const { getByRole } = render(
            <MusicPagination recentPlaylist={mockRecentPlaylistData} itemsPerPage={itemsPerPage} currentPage={currentPage} onChange={mockHandlePageChange} />
        )

        const totalPages = Math.ceil(mockRecentPlaylistData.length / itemsPerPage)
        const totalPagesButton = getByRole('button', { name: `Go to page ${totalPages}` })

        await act(async () => {
            fireEvent.click(totalPagesButton)
        })

        expect(totalPagesButton).toBeInTheDocument()
    })

    test('should render the pagination component with correct no. of pages for a given input array (length 15) and itemsPerPage (7) set statically', async () => {
        const currentPage = 1
        const mockData = mockRecentPlaylistData.slice(0,15)

        const { getByRole } = render(
            <MusicPagination recentPlaylist={mockData} itemsPerPage={itemsPerPage} currentPage={currentPage} onChange={mockHandlePageChange} />
        )

        const totalPages = Math.ceil(mockData.length / itemsPerPage)
        const totalPagesButton = getByRole('button', { name: `Go to page ${totalPages}` })

        await act(async () => {
            fireEvent.click(totalPagesButton)
        })

        expect(totalPagesButton).toBeInTheDocument()
    })

    test('should match snapshot when given an input array (length 50)', () => {
        const currentPage = 3
        const tree = renderer.create(
            <MusicPagination recentPlaylist={mockRecentPlaylistData} itemsPerPage={itemsPerPage} currentPage={currentPage} onChange={mockHandlePageChange} />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('should match snapshot when given an input array (length 15)', () => {
        const currentPage = 1
        const mockData = mockRecentPlaylistData.slice(0,15)
        const tree = renderer.create(
            <MusicPagination recentPlaylist={mockData} itemsPerPage={itemsPerPage} currentPage={currentPage} onChange={mockHandlePageChange} />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
