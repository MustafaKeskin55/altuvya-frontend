import { db } from './mockData';

// Helper to simulate latency
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthApi = {
    register: async (userData) => {
        await delay();
        const id = Date.now();
        const newUser = {
            id,
            ...userData,
            karma: 0,
            avatar: `https://i.pravatar.cc/150?u=${id}`
        };
        db.push('users', newUser);
        return {
            token: 'mock-jwt-token-' + id,
            user: newUser
        };
    },

    login: async (credentials) => {
        await delay();
        const user = db.find('users', { username: credentials.username });
        if (user) {
            return {
                token: 'mock-jwt-token-12345',
                userId: user.id,
                username: user.username,
                user: {
                    userId: user.id,
                    username: user.username,
                    ...user
                }
            };
        }
        throw { response: { status: 401, data: { message: 'Hatalı kullanıcı adı veya şifre' } } };
    }
};

export const mockUserApi = {
    getUser: async (id) => {
        await delay();
        const user = db.find('users', { id: parseInt(id) });
        if (user) return user;
        throw { response: { status: 404 } };
    },

    getUserByUsername: async (username) => {
        await delay();
        const user = db.find('users', { username });
        if (user) return user;
        throw { response: { status: 404 } };
    },

    updateUser: async (id, userData) => {
        await delay();
        db.update('users', parseInt(id), userData);
        return db.find('users', { id: parseInt(id) });
    },

    getUserGroups: async (username) => {
        await delay();
        // For demo: return all groups
        return db.get('groups');
    }
};

export const mockGroupApi = {
    getAllGroups: async () => {
        await delay();
        return db.get('groups');
    },

    getGroup: async (id) => {
        await delay();
        const group = db.find('groups', { id: parseInt(id) });
        if (group) return group;
        throw { response: { status: 404 } };
    },

    createGroup: async (groupData) => {
        await delay();
        const id = Date.now();
        const newGroup = { id, ...groupData, memberCount: 1 };
        db.push('groups', newGroup);
        return newGroup;
    },

    joinGroup: async (id) => {
        await delay();
        return { message: 'Joined group', groupId: parseInt(id) };
    },

    getAllChats: async () => {
        await delay();
        return db.get('chats');
    },

    getMessagesByChat: async (chatId) => {
        await delay();
        return db.filter('messages', { chatId: parseInt(chatId) });
    }
};

export const mockPostApi = {
    getAllPosts: async () => {
        await delay();
        return db.get('posts');
    },

    getPostsByGroup: async (groupId) => {
        await delay();
        return db.filter('posts', { groupId: parseInt(groupId) });
    },

    getSpotlightPosts: async () => {
        await delay();
        return db.get('posts').filter(p => p.isSpotlight);
    },

    createPost: async (postData) => {
        await delay();
        const id = Date.now();
        const user = db.find('users', { id: postData.userId }) || db.get('users')[0];
        const newPost = {
            id,
            ...postData,
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: 0,
            username: user.username,
            userAvatar: user.avatar,
            userId: postData.userId || user.id
        };
        db.push('posts', newPost);
        return newPost;
    },

    votePost: async (postId, userId, voteType) => {
        await delay();
        const post = db.find('posts', { id: parseInt(postId) });
        if (post) {
            let newLikes = post.likes;
            if (voteType === 'upvote') newLikes += 1;
            else if (voteType === 'remove') newLikes = Math.max(0, newLikes - 1);

            db.update('posts', parseInt(postId), { likes: newLikes });
            return { success: true, newScore: newLikes };
        }
        throw { response: { status: 404 } };
    },

    getStories: async () => {
        await delay();
        return db.get('stories');
    }
};

export const mockReactionApi = {
    addReaction: async (userId, postId, emoji) => {
        await delay();
        return { success: true };
    },

    removeReaction: async (userId, postId, emoji) => {
        await delay();
        return { success: true };
    },

    getPostReactions: async (postId) => {
        await delay();
        return [];
    }
};
