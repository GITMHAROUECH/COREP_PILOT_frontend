import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Download, FileSpreadsheet, FileText, Info, Users } from 'lucide-react';
import { exportApi } from '../services/exportApi';

const ExportPanel = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);
  const [teamsMapping, setTeamsMapping] = useState(null);
  const [showTeamsDialog, setShowTeamsDialog] = useState(false);

  const handleExportExcel = async () => {
    setIsExporting(true);
    setExportStatus(null);
    
    try {
      await exportApi.exportCalendarExcel();
      setExportStatus({ type: 'success', message: 'Exportation Excel réussie !' });
    } catch (error) {
      setExportStatus({ type: 'error', message: error.message });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    setExportStatus(null);
    
    try {
      await exportApi.exportCalendarCSV();
      setExportStatus({ type: 'success', message: 'Exportation CSV réussie !' });
    } catch (error) {
      setExportStatus({ type: 'error', message: error.message });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShowTeamsMapping = async () => {
    try {
      const mapping = await exportApi.getTeamsMapping();
      setTeamsMapping(mapping);
      setShowTeamsDialog(true);
    } catch (error) {
      setExportStatus({ type: 'error', message: 'Erreur lors de la récupération du mapping des équipes' });
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Exportation du Calendrier</h2>
          <p className="text-gray-600">Exportez le calendrier des tâches COREP au format Excel ou CSV</p>
        </div>
        <Button
          variant="outline"
          onClick={handleShowTeamsMapping}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          Mapping Équipes
        </Button>
      </div>

      {/* Messages de statut */}
      {exportStatus && (
        <div className={`p-4 rounded-lg ${
          exportStatus.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {exportStatus.message}
        </div>
      )}

      {/* Options d'exportation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exportation Excel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
              Exportation Excel
            </CardTitle>
            <CardDescription>
              Fichier Excel (.xlsx) avec deux feuilles : calendrier principal et légende des équipes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p><strong>Contenu :</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Feuille "CALENDRIER" : TACHE, EQUIPE_ACR, D_RELATIF_OUVRE, DATE, STATUT</li>
                <li>Feuille "LEGENDE_EQUIPE" : Correspondances équipes et localisations</li>
                <li>Tri par date croissante</li>
                <li>Formatage automatique des colonnes</li>
              </ul>
            </div>
            <Button 
              onClick={handleExportExcel}
              disabled={isExporting}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exportation...' : 'Exporter en Excel'}
            </Button>
          </CardContent>
        </Card>

        {/* Exportation CSV */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Exportation CSV
            </CardTitle>
            <CardDescription>
              Fichier CSV (.csv) avec séparateur point-virgule, compatible Excel français
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p><strong>Contenu :</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Colonnes : TACHE;EQUIPE_ACR;D_RELATIF_OUVRE;DATE;STATUT</li>
                <li>Séparateur : point-virgule (;)</li>
                <li>Encodage : UTF-8</li>
                <li>Tri par date croissante</li>
              </ul>
            </div>
            <Button 
              onClick={handleExportCSV}
              disabled={isExporting}
              variant="outline"
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exportation...' : 'Exporter en CSV'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Informations sur le format */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Format d'Exportation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Colonnes exportées :</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>TACHE</strong> : Nom de la tâche</li>
                <li><strong>EQUIPE_ACR</strong> : Code équipe (NRM, CONSO, etc.)</li>
                <li><strong>D_RELATIF_OUVRE</strong> : Jour ouvré relatif (J+X)</li>
                <li><strong>DATE</strong> : Date au format DD/MM/YYYY</li>
                <li><strong>STATUT</strong> : À faire, En cours, Terminé, En retard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Équipes disponibles :</h4>
              <div className="text-sm space-y-1">
                <p>NRM, CONSO, ACC-TN, RISQ, MOA</p>
                <p>IT-SG, DQ, GAR, RPT, CFO</p>
                <p className="text-gray-600 mt-2">
                  Cliquez sur "Mapping Équipes" pour voir les détails complets
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog pour le mapping des équipes */}
      <Dialog open={showTeamsDialog} onOpenChange={setShowTeamsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mapping des Équipes</DialogTitle>
            <DialogDescription>
              Correspondances entre les codes équipes et leurs intitulés complets
            </DialogDescription>
          </DialogHeader>
          
          {teamsMapping && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(teamsMapping.equipes).map(([code, info]) => (
                  <div key={code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {code}
                      </span>
                      <span className="font-medium">{info.intitule}</span>
                    </div>
                    <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
                      {info.localisation}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <p><strong>Note :</strong> Le mapping automatique se base sur les mots-clés dans les noms des responsables. 
                Les équipes sont assignées selon les termes trouvés dans les champs "Responsable R" des tâches.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExportPanel;

