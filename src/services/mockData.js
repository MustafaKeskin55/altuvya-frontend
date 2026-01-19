import { users } from './data/users';
import { posts } from './data/posts';
import { groups } from './data/groups';
import { stories } from './data/stories';
import { chats, messages } from './data/chats';

// Initial data for the application - modularized
export const INITIAL_DATA = {
    users,
    groups,
    posts,
    stories,
    messages,
    chats,
    reactions: []
};

// In-memory data store
let mockDb = { ...INITIAL_DATA };

// Helper to save to local storage
const saveToStorage = () => {
    localStorage.setItem('altuvya_mock_db', JSON.stringify(mockDb));
};

// Load from local storage if available
const savedDb = localStorage.getItem('altuvya_mock_db');
if (savedDb) {
    try {
        const parsed = JSON.parse(savedDb);
        // Ensure all collections exist in case of schema updates
        mockDb = { ...INITIAL_DATA, ...parsed };
    } catch (e) {
        console.error("Failed to parse saved mock DB", e);
    }
}

export const db = {
    get: (collection) => mockDb[collection],
    find: (collection, query) => {
        return mockDb[collection].find(item => {
            return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
        });
    },
    filter: (collection, query) => {
        return mockDb[collection].filter(item => {
            return Object.entries(query).every(([key, value]) => String(item[key]) === String(value));
        });
    },
    push: (collection, item) => {
        mockDb[collection].push(item);
        saveToStorage();
    },
    update: (collection, id, updates) => {
        const index = mockDb[collection].findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            mockDb[collection][index] = { ...mockDb[collection][index], ...updates };
            saveToStorage();
        }
    },
    delete: (collection, id) => {
        mockDb[collection] = mockDb[collection].filter(item => item.id !== parseInt(id));
        saveToStorage();
    }
};

export const resetDb = () => {
    mockDb = { ...INITIAL_DATA };
    saveToStorage();
};
