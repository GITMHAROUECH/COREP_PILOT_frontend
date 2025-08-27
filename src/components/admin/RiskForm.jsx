import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const RiskForm = ({ risk, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    reference: risk?.reference || '',
    description_risque: risk?.description_risque || '',
    impact: risk?.impact || '',
    parade_mitigation: risk?.parade_mitigation || '',
    owner_risque: risk?.owner_risque || ''
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
          {isEditing ? 'Modifier le risque' : 'Nouveau risque'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference">Référence *</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => handleChange('reference', e.target.value)}
                placeholder="Ex: R0, R1, R2..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner_risque">Propriétaire du risque *</Label>
              <Input
                id="owner_risque"
                value={formData.owner_risque}
                onChange={(e) => handleChange('owner_risque', e.target.value)}
                placeholder="Ex: PMO, IT/RA, Finance..."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description_risque">Description du risque *</Label>
            <Textarea
              id="description_risque"
              value={formData.description_risque}
              onChange={(e) => handleChange('description_risque', e.target.value)}
              placeholder="Description détaillée du risque..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="impact">Impact *</Label>
            <Textarea
              id="impact"
              value={formData.impact}
              onChange={(e) => handleChange('impact', e.target.value)}
              placeholder="Description de l'impact potentiel..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parade_mitigation">Parade/Mitigation *</Label>
            <Textarea
              id="parade_mitigation"
              value={formData.parade_mitigation}
              onChange={(e) => handleChange('parade_mitigation', e.target.value)}
              placeholder="Mesures de prévention et de mitigation..."
              rows={3}
              required
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
              disabled={isSubmitting || !formData.reference.trim() || !formData.description_risque.trim()}
            >
              {isSubmitting ? 'Enregistrement...' : (isEditing ? 'Modifier' : 'Créer')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default RiskForm

