// Notes.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notes from './Notes';
import UserContext from '../UserContext';
import { getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { db, colRef } from '../firebase';

// Mock Firestore
jest.mock('firebase/firestore', () => ({
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

// Mock UserContext
const userContextValue = {
  email: 'test@example.com'
};

const mockNotes = [
  { id: '1', title: 'Note 1', details: 'Details 1', category: 'Work' },
  { id: '2', title: 'Note 2', details: 'Details 2', category: 'Personal' },
];

describe('Notes Component', () => {
  beforeEach(() => {
    getDocs.mockResolvedValue({
      docs: mockNotes.map(note => ({
        id: note.id,
        data: () => note,
      }))
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders notes from Firestore', async () => {
    render(
      <UserContext.Provider value={userContextValue}>
        <Notes />
      </UserContext.Provider>
    );

    // Check that notes are rendered
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.getByText('Note 2')).toBeInTheDocument();
    });
  });

  it('searches notes correctly', async () => {
    render(
      <UserContext.Provider value={userContextValue}>
        <Notes />
      </UserContext.Provider>
    );

    // Wait for notes to load
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
    });

    // Perform search
    fireEvent.change(screen.getByPlaceholderText('Search or input empty string to reset'), { target: { value: 'Work' } });
    fireEvent.click(screen.getByText('Search'));

    // Check the filtered results
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.queryByText('Note 2')).not.toBeInTheDocument();
    });
  });

  it('resets notes when search input is empty', async () => {
    render(
      <UserContext.Provider value={userContextValue}>
        <Notes />
      </UserContext.Provider>
    );

    // Wait for notes to load
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
    });

    // Perform search and reset
    fireEvent.change(screen.getByPlaceholderText('Search or input empty string to reset'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Search'));

    // Check the reset results
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.getByText('Note 2')).toBeInTheDocument();
    });
  });

  it('deletes a note', async () => {
    render(
      <UserContext.Provider value={userContextValue}>
        <Notes />
      </UserContext.Provider>
    );

    // Wait for notes to load
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
    });

    // Mock deleteDoc response
    deleteDoc.mockResolvedValue();

    // Click delete button (Assuming delete button has text 'Delete')
    fireEvent.click(screen.getByText('Delete'));

    // Check if the note is removed
    await waitFor(() => {
      expect(screen.queryByText('Note 1')).not.toBeInTheDocument();
    });
  });
});
