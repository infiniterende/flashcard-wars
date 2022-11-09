import api from './apiConfig'

export const getAllDecks =  async () => {
    try {
        const response = await api.get('/allDecks');
        return response.data;
    } catch(error) {
    throw error;
    }
}

export const getDeck = async (deckId) => {
    try {
        const response = await api.get(`/decks/${deckId}`);
        return response.data 
    } catch(error) {
        throw error;
    }
}

export const getFlashcards = async (deckId) => {
    try {
        const response = await api.get(`/cards/${deckId}`);
        return response.data 
    } catch(error) {
        throw error;
    }
}

export const getLeaderboard = async () => {
    try {
        const response = await api.get(`/leaderboard`);
        return response.data 
    } catch(error) {
        throw error;
    }
}

