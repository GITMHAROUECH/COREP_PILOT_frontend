import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const PhaseForm = ({ phase, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    nom_phase: phase?.nom_phase || '',
    description: phase?.description || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
          {isEditing ? 'Modifier la phase' : 'Nouvelle phase'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom_phase">Nom de la phase *</Label>
            <Input
              id="nom_phase"
              value={formData.nom_phase}
              onChange={(e) => handleChange('nom_phase', e.target.value)}
              placeholder="Ex: Phase 1 - Préparation & Collecte"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Description détaillée de la phase..."
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
              disabled={isSubmitting || !formData.nom_phase.trim()}
            >
              {isSubmitting ? 'Enregistrement...' : (isEditing ? 'Modifier' : 'Créer')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default PhaseForm

