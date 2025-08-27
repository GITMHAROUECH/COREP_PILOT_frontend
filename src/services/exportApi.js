/**
 * Service API pour l'exportation Excel/CSV
 */

import config from '../config/api.js';

const API_BASE_URL = `${config.API_BASE_URL}/export`;

export const exportApi = {
  /**
   * Exporte le calendrier au format Excel
   */
  exportCalendarExcel: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/calendar/excel`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      // Récupérer le blob du fichier Excel
      const blob = await response.blob();
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extraire le nom du fichier depuis les headers ou utiliser un nom par défaut
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'COREP_Calendrier.xlsx';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'Exportation Excel réussie' };
    } catch (error) {
      console.error('Erreur lors de l\'exportation Excel:', error);
      throw new Error(`Erreur lors de l'exportation Excel: ${error.message}`);
    }
  },

  /**
   * Exporte le calendrier au format CSV
   */
  exportCalendarCSV: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/calendar/csv`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      // Récupérer le contenu CSV
      const csvContent = await response.text();
      
      // Créer un blob et un lien de téléchargement
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extraire le nom du fichier depuis les headers ou utiliser un nom par défaut
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'COREP_Calendrier.csv';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'Exportation CSV réussie' };
    } catch (error) {
      console.error('Erreur lors de l\'exportation CSV:', error);
      throw new Error(`Erreur lors de l'exportation CSV: ${error.message}`);
    }
  },

  /**
   * Récupère le mapping des équipes
   */
  getTeamsMapping: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/mapping`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération du mapping des équipes:', error);
      throw new Error(`Erreur lors de la récupération du mapping: ${error.message}`);
    }
  }
};

