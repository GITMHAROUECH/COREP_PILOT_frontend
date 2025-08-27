import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Calendar, Users, FileText, AlertTriangle } from 'lucide-react'

const TaskModal = ({ task, isOpen, onClose, onUpdateTask }) => {
  const [status, setStatus] = useState(task?.statut || 'À faire')
  const [notes, setNotes] = useState(task?.notes || '')

  if (!task) return null

  const handleSave = () => {
    onUpdateTask(task.id, { statut: status, notes })
    onClose()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'En cours':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'En retard':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {task.nom_tache}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm"><strong>Date:</strong> {task.date_jour}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(task.statut)}>
                {task.statut}
              </Badge>
            </div>
          </div>

          {/* Responsabilités RACI */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Matrice RACI
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><strong>Responsable (R):</strong> {task.responsable_R}</div>
              <div><strong>Approbateur (A):</strong> {task.responsable_A}</div>
              <div><strong>Consulté (C):</strong> {task.responsable_C}</div>
              <div><strong>Informé (I):</strong> {task.responsable_I}</div>
            </div>
          </div>

          {/* Interactions */}
          {task.interactions && (
            <div>
              <h3 className="font-semibold mb-2">Interactions / Parties prenantes</h3>
              <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded">
                {task.interactions}
              </p>
            </div>
          )}

          {/* Livrables */}
          {task.livrables && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Livrables
              </h3>
              <p className="text-sm text-gray-700 bg-green-50 p-3 rounded">
                {task.livrables}
              </p>
            </div>
          )}

          {/* Mise à jour du statut */}
          <div className="space-y-3">
            <h3 className="font-semibold">Mise à jour</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Statut</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="À faire">À faire</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                  <SelectItem value="En retard">En retard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajoutez des notes sur cette tâche..."
                rows={4}
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TaskModal

