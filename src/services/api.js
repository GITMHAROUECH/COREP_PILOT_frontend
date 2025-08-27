// Service API pour communiquer avec le backend Flask

import config from '../config/api.js';

const API_BASE_URL = config.API_BASE_URL;

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      timeout: config.API_TIMEOUT,
      ...options,
    }

    try {
      const response = await fetch(url, requestConfig)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Test de connectivité
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  // Phases
  async getPhases() {
    return this.request('/phases')
  }

  async getPhase(id) {
    return this.request(`/phases/${id}`)
  }

  // Tâches
  async getTaches() {
    return this.request('/taches')
  }

  async getTache(id) {
    return this.request(`/taches/${id}`)
  }

  async updateTache(id, data) {
    return this.request(`/taches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async getTachesByPhase(phaseId) {
    return this.request(`/taches/phase/${phaseId}`)
  }

  // Risques
  async getRisques() {
    return this.request('/risques')
  }

  async getRisque(id) {
    return this.request(`/risques/${id}`)
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/dashboard/stats')
  }

  // Export
  async exportData() {
    return this.request('/export')
  }
}

export default new ApiService()

