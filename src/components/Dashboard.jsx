import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react'

const Dashboard = ({ phases, tasks, risks, stats }) => {
  if (!stats) {
    return <div>Chargement des statistiques...</div>
  }

  const {
    totalTasks,
    completedTasks,
    inProgressTasks,
    overdueTasks,
    pendingTasks,
    overallProgress,
    phaseStats,
    criticalRisks
  } = stats

  return (
    <div className="space-y-6">
      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tâches</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              Réparties sur {phases.length} phases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {overallProgress}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              {pendingTasks} en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En retard</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              {criticalRisks} risques critiques
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progression globale */}
      <Card>
        <CardHeader>
          <CardTitle>Progression Globale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Avancement du projet COREP</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completedTasks} tâches terminées</span>
              <span>{totalTasks - completedTasks} restantes</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progression par phase */}
      <Card>
        <CardHeader>
          <CardTitle>Progression par Phase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {phaseStats.map((phase) => (
              <div key={phase.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{phase.nom_phase}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {phase.completedTasks}/{phase.totalTasks}
                    </Badge>
                    <span className="text-sm">{phase.progress}%</span>
                  </div>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

