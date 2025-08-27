import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { AlertTriangle, Shield, User } from 'lucide-react'

const RiskRegister = ({ risks }) => {
  const getRiskSeverity = (impact) => {
    if (impact.toLowerCase().includes('blocage') || impact.toLowerCase().includes('retard')) {
      return { color: 'bg-red-100 text-red-800 border-red-200', level: 'Élevé' }
    } else if (impact.toLowerCase().includes('alerte') || impact.toLowerCase().includes('incohérence')) {
      return { color: 'bg-orange-100 text-orange-800 border-orange-200', level: 'Moyen' }
    } else {
      return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', level: 'Faible' }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
          Registre des Risques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {risks.map((risk) => {
            const severity = getRiskSeverity(risk.impact)
            return (
              <div key={risk.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="font-mono">
                      {risk.reference}
                    </Badge>
                    <Badge className={severity.color}>
                      {severity.level}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-3 h-3 mr-1" />
                    {risk.owner_risque}
                  </div>
                </div>
                
                <h4 className="font-semibold text-sm mb-2">{risk.description_risque}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="flex items-center mb-1">
                      <AlertTriangle className="w-3 h-3 mr-1 text-orange-500" />
                      <span className="font-medium">Impact:</span>
                    </div>
                    <p className="text-gray-700 bg-orange-50 p-2 rounded">
                      {risk.impact}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Shield className="w-3 h-3 mr-1 text-green-500" />
                      <span className="font-medium">Parade / Mitigation:</span>
                    </div>
                    <p className="text-gray-700 bg-green-50 p-2 rounded">
                      {risk.parade_mitigation}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default RiskRegister

