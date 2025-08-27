import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Calendar, Users, FileText } from 'lucide-react'

const PhaseCard = ({ phase, tasks, onTaskClick }) => {
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

  const completedTasks = tasks.filter(task => task.statut === 'Terminé').length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Card className="mb-6 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-primary">
            {phase.nom_phase}
          </CardTitle>
          <Badge variant="outline" className="ml-2">
            {completedTasks}/{totalTasks} tâches
          </Badge>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onTaskClick(task)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">{task.nom_tache}</h4>
                <Badge className={getStatusColor(task.statut)}>
                  {task.statut}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {task.date_jour}
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  R: {task.responsable_R}
                </div>
                <div className="flex items-center">
                  <FileText className="w-3 h-3 mr-1" />
                  {task.livrables ? task.livrables.substring(0, 30) + '...' : 'Aucun livrable'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PhaseCard

