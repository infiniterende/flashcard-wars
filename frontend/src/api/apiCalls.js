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


export const updateUserPoints = async (cardId, payload) => {
    try {
      const response = await api.put(`/cards/${cardId}/updateUserPoints`, payload)
      return response.data
    } catch (error) {
      throw error
    }
  }
  

  export const createFlashcard = async (id, payload) => {
    try {
      const response = await api.post(`/cards/${id}`, payload)
      return response.data
    } catch (error) {
      throw error
    }
  }
  
  export const editFlashcard = async (cardId, payload) => {
    try {
      const response = await api.put(`/cards/${cardId}`, payload)
      return response.data
    } catch (error) {
      throw error
    }
  }
  
  export const deleteFlashcard = async (cardId) => {
    try {
      const response = await api.delete(`/cards/${cardId}`)
    } catch (error) {
      throw error
    }
  }