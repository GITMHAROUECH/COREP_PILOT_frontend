import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const TaskForm = ({ task, phases, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    id_phase: task?.id_phase || '',
    date_jour: task?.date_jour || '',
    nom_tache: task?.nom_tache || '',
    interactions: task?.interactions || '',
    responsable_R: task?.responsable_R || '',
    responsable_A: task?.responsable_A || '',
    responsable_C: task?.responsable_C || '',
    responsable_I: task?.responsable_I || '',
    livrables: task?.livrables || '',
    statut: task?.statut || 'À faire',
    notes: task?.notes || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const statutOptions = ['À faire', 'En cours', 'Terminé', 'En retard']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Modifier la tâche' : 'Nouvelle tâche'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id_phase">Phase *</Label>
              <Select
                value={formData.id_phase.toString()}
                onValueChange={(value) => handleChange('id_phase', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une phase" />
                </SelectTrigger>
                <SelectContent>
                  {phases.map((phase) => (
                    <SelectItem key={phase.id} value={phase.id.toString()}>
                      {phase.nom_phase}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_jour">Date/Jour *</Label>
              <Input
                id="date_jour"
                value={formData.date_jour}
                onChange={(e) => handleChange('date_jour', e.target.value)}
                placeholder="Ex: J+0, 01/12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nom_tache">Nom de la tâche *</Label>
            <Input
              id="nom_tache"
              value={formData.nom_tache}
              onChange={(e) => handleChange('nom_tache', e.target.value)}
              placeholder="Description de la tâche..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interactions">Interactions</Label>
            <Textarea
              id="interactions"
              value={formData.interactions}
              onChange={(e) => handleChange('interactions', e.target.value)}
              placeholder="Ex: PMO → Finance, Risque, IT/RA"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsable_R">Responsable (R)</Label>
              <Input
                id="responsable_R"
                value={formData.responsable_R}
                onChange={(e) => handleChange('responsable_R', e.target.value)}
                placeholder="Responsible"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsable_A">Approbateur (A)</Label>
              <Input
                id="responsable_A"
                value={formData.responsable_A}
                onChange={(e) => handleChange('responsable_A', e.target.value)}
                placeholder="Accountable"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsable_C">Consulté (C)</Label>
              <Input
                id="responsable_C"
                value={formData.responsable_C}
                onChange={(e) => handleChange('responsable_C', e.target.value)}
                placeholder="Consulted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsable_I">Informé (I)</Label>
              <Input
                id="responsable_I"
                value={formData.responsable_I}
                onChange={(e) => handleChange('responsable_I', e.target.value)}
                placeholder="Informed"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="livrables">Livrables</Label>
            <Textarea
              id="livrables"
              value={formData.livrables}
              onChange={(e) => handleChange('livrables', e.target.value)}
              placeholder="Description des livrables attendus..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select
                value={formData.statut}
                onValueChange={(value) => handleChange('statut', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statutOptions.map((statut) => (
                    <SelectItem key={statut} value={statut}>
                      {statut}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Notes additionnelles..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.nom_tache.trim() || !formData.id_phase}
            >
              {isSubmitting ? 'Enregistrement...' : (isEditing ? 'Modifier' : 'Créer')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default TaskForm

