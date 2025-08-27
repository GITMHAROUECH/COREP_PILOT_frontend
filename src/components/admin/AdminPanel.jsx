import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw,
  Settings,
  Users,
  Calendar,
  AlertTriangle
} from 'lucide-react'
import PhaseForm from './PhaseForm.jsx'
import TaskForm from './TaskForm.jsx'
import RiskForm from './RiskForm.jsx'
import AdminApiService from '../../services/adminApi.js'

const AdminPanel = ({ phases, tasks, risks, onDataChange }) => {
  const [activeTab, setActiveTab] = useState('phases')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCreate = (type) => {
    setEditingItem(null)
    setShowForm(type)
  }

  const handleEdit = (item, type) => {
    setEditingItem(item)
    setShowForm(type)
  }

  const handleDelete = async (id, type) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer cet élément ?`)) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      switch (type) {
        case 'phase':
          await AdminApiService.deletePhase(id)
          break
        case 'task':
          await AdminApiService.deleteTache(id)
          break
        case 'risk':
          await AdminApiService.deleteRisque(id)
          break
      }
      
      await onDataChange()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (formData, type) => {
    setIsLoading(true)
    setError(null)

    try {
      if (editingItem) {
        // Modification
        switch (type) {
          case 'phases':
            await AdminApiService.updatePhase(editingItem.id, formData)
            break
          case 'tasks':
            await AdminApiService.updateTacheAdmin(editingItem.id, formData)
            break
          case 'risks':
            await AdminApiService.updateRisque(editingItem.id, formData)
            break
        }
      } else {
        // Création
        switch (type) {
          case 'phases':
            await AdminApiService.createPhase(formData)
            break
          case 'tasks':
            await AdminApiService.createTache(formData)
            break
          case 'risks':
            await AdminApiService.createRisque(formData)
            break
        }
      }
      
      setShowForm(false)
      setEditingItem(null)
      await onDataChange()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackup = async () => {
    try {
      const data = await AdminApiService.backupData()
      const dataToExport = {
        ...data,
        backup_date: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
      })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `corep-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleImport = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      if (!confirm('Cette action remplacera toutes les données existantes. Continuer ?')) {
        return
      }

      await AdminApiService.importData(data)
      await onDataChange()
    } catch (err) {
      setError('Erreur lors de l\'importation: ' + err.message)
    }
  }

  const handleReset = async () => {
    if (!confirm('Cette action supprimera toutes les données et restaurera les données par défaut. Continuer ?')) {
      return
    }

    try {
      await AdminApiService.resetData()
      await onDataChange()
    } catch (err) {
      setError(err.message)
    }
  }

  const getStatusBadge = (statut) => {
    const statusColors = {
      'Terminé': 'bg-green-100 text-green-800',
      'En cours': 'bg-blue-100 text-blue-800',
      'À faire': 'bg-gray-100 text-gray-800',
      'En retard': 'bg-red-100 text-red-800'
    }
    
    return (
      <Badge className={statusColors[statut] || 'bg-gray-100 text-gray-800'}>
        {statut}
      </Badge>
    )
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Administration</h2>
          <Button variant="outline" onClick={() => setShowForm(false)}>
            Retour à la liste
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {showForm === 'phases' && (
          <PhaseForm
            phase={editingItem}
            onSubmit={(data) => handleSubmit(data, 'phases')}
            onCancel={() => setShowForm(false)}
            isEditing={!!editingItem}
          />
        )}

        {showForm === 'tasks' && (
          <TaskForm
            task={editingItem}
            phases={phases}
            onSubmit={(data) => handleSubmit(data, 'tasks')}
            onCancel={() => setShowForm(false)}
            isEditing={!!editingItem}
          />
        )}

        {showForm === 'risks' && (
          <RiskForm
            risk={editingItem}
            onSubmit={(data) => handleSubmit(data, 'risks')}
            onCancel={() => setShowForm(false)}
            isEditing={!!editingItem}
          />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Settings className="w-6 h-6" />
          <span>Administration</span>
        </h2>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBackup}>
            <Download className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
          
          <label className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="phases" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Phases ({phases.length})</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Tâches ({tasks.length})</span>
          </TabsTrigger>
          <TabsTrigger value="risks" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Risques ({risks.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phases" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gestion des phases</h3>
            <Button onClick={() => handleCreate('phases')}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle phase
            </Button>
          </div>

          <div className="grid gap-4">
            {phases.map((phase) => (
              <Card key={phase.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold">{phase.nom_phase}</h4>
                      <p className="text-sm text-gray-600 mt-1">{phase.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(phase, 'phases')}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(phase.id, 'phase')}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gestion des tâches</h3>
            <Button onClick={() => handleCreate('tasks')}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle tâche
            </Button>
          </div>

          <div className="grid gap-4">
            {tasks.map((task) => {
              const phase = phases.find(p => p.id === task.id_phase)
              return (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{task.nom_tache}</h4>
                          {getStatusBadge(task.statut)}
                        </div>
                        <p className="text-sm text-gray-600">
                          Phase: {phase?.nom_phase} | Date: {task.date_jour}
                        </p>
                        <p className="text-sm text-gray-600">
                          Responsable: {task.responsable_R}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(task, 'tasks')}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(task.id, 'task')}
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gestion des risques</h3>
            <Button onClick={() => handleCreate('risks')}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau risque
            </Button>
          </div>

          <div className="grid gap-4">
            {risks.map((risk) => (
              <Card key={risk.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{risk.reference}</Badge>
                        <span className="text-sm text-gray-600">Propriétaire: {risk.owner_risque}</span>
                      </div>
                      <h4 className="font-semibold mb-1">{risk.description_risque}</h4>
                      <p className="text-sm text-gray-600">
                        Impact: {risk.impact}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(risk, 'risks')}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(risk.id, 'risk')}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPanel

