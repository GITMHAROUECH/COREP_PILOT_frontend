// Service API pour l'administration des données COREP

import config from '../config/api.js';

const API_BASE_URL = `${config.API_BASE_URL}/admin`;

class AdminApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Admin API request failed:', error)
      throw error
    }
  }

  // Gestion des phases
  async createPhase(phaseData) {
    return this.request('/phases', {
      method: 'POST',
      body: JSON.stringify(phaseData),
    })
  }

  async updatePhase(id, phaseData) {
    return this.request(`/phases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(phaseData),
    })
  }

  async deletePhase(id) {
    return this.request(`/phases/${id}`, {
      method: 'DELETE',
    })
  }

  // Gestion des tâches
  async createTache(tacheData) {
    return this.request('/taches', {
      method: 'POST',
      body: JSON.stringify(tacheData),
    })
  }

  async updateTacheAdmin(id, tacheData) {
    return this.request(`/taches/${id}/admin`, {
      method: 'PUT',
      body: JSON.stringify(tacheData),
    })
  }

  async deleteTache(id) {
    return this.request(`/taches/${id}`, {
      method: 'DELETE',
    })
  }

  // Gestion des risques
  async createRisque(risqueData) {
    return this.request('/risques', {
      method: 'POST',
      body: JSON.stringify(risqueData),
    })
  }

  async updateRisque(id, risqueData) {
    return this.request(`/risques/${id}`, {
      method: 'PUT',
      body: JSON.stringify(risqueData),
    })
  }

  async deleteRisque(id) {
    return this.request(`/risques/${id}`, {
      method: 'DELETE',
    })
  }

  // Utilitaires d'administration
  async resetData() {
    return this.request('/reset-data', {
      method: 'POST',
    })
  }

  async backupData() {
    return this.request('/backup')
  }

  async importData(data) {
    return this.request('/import', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export default new AdminApiService()

