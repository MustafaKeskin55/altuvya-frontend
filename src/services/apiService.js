import api from './api'
import * as mock from './mockApiService'

// TRUE: Use internal mock data, FALSE: Use real backend API
const USE_MOCK = true;

export const authApi = USE_MOCK ? mock.mockAuthApi : {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData)
        return response.data
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials)
        return response.data
    }
}

export const userApi = USE_MOCK ? mock.mockUserApi : {
    getUser: async (id) => {
        const response = await api.get(`/users/${id}`)
        return response.data
    },

    getUserByUsername: async (username) => {
        const response = await api.get(`/users/username/${username}`)
        return response.data
    },

    updateUser: async (id, userData) => {
        const response = await api.put(`/users/${id}`, userData)
        return response.data
    }
}

export const groupApi = USE_MOCK ? mock.mockGroupApi : {
    getAllGroups: async () => {
        const response = await api.get('/groups')
        return response.data
    },

    getGroup: async (id) => {
        const response = await api.get(`/groups/${id}`)
        return response.data
    },

    createGroup: async (groupData) => {
        const response = await api.post('/groups', groupData)
        return response.data
    },

    joinGroup: async (id) => {
        const response = await api.post(`/groups/${id}/join`)
        return response.data
    },

    getAllChats: async () => {
        const response = await api.get('/chats')
        return response.data
    },

    getMessagesByChat: async (chatId) => {
        const response = await api.get(`/messages/chat/${chatId}`)
        return response.data
    }
}

export const postApi = USE_MOCK ? mock.mockPostApi : {
    getAllPosts: async () => {
        const response = await api.get('/posts')
        return response.data
    },

    getPostsByGroup: async (groupId) => {
        const response = await api.get(`/posts/group/${groupId}`)
        return response.data
    },

    getSpotlightPosts: async () => {
        const response = await api.get('/posts/spotlight')
        return response.data
    },

    createPost: async (postData) => {
        const response = await api.post('/posts', postData)
        return response.data
    },

    votePost: async (postId, userId, voteType) => {
        const response = await api.post(`/posts/${postId}/vote?userId=${userId}&voteType=${voteType}`)
        return response.data
    },

    getStories: async () => {
        const response = await api.get('/stories')
        return response.data
    }
}

export const reactionApi = USE_MOCK ? mock.mockReactionApi : {
    addReaction: async (userId, postId, emoji) => {
        const response = await api.post(`/reactions?userId=${userId}&postId=${postId}&emoji=${emoji}`)
        return response.data
    },

    removeReaction: async (userId, postId, emoji) => {
        const response = await api.delete(`/reactions?userId=${userId}&postId=${postId}&emoji=${emoji}`)
        return response.data
    },

    getPostReactions: async (postId) => {
        const response = await api.get(`/reactions/post/${postId}`)
        return response.data
    }
}
