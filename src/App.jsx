import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Button } from '@/components/ui/button.jsx'
import { BarChart3, Calendar, AlertTriangle, Download, Loader2, Settings } from 'lucide-react'
import PhaseCard from './components/PhaseCard.jsx'
import TaskModal from './components/TaskModal.jsx'
import RiskRegister from './components/RiskRegister.jsx'
import Dashboard from './components/Dashboard.jsx'
import AdminPanel from './components/admin/AdminPanel.jsx'
import ExportPanel from './components/ExportPanel.jsx'
import ApiService from './services/api.js'
import './App.css'

function App() {
  const [phases, setPhases] = useState([])
  const [tasks, setTasks] = useState([])
  const [risks, setRisks] = useState([])
  const [dashboardStats, setDashboardStats] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Charger les données depuis l'API
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [phasesData, tachesData, risquesData, statsData] = await Promise.all([
        ApiService.getPhases(),
        ApiService.getTaches(),
        ApiService.getRisques(),
        ApiService.getDashboardStats()
      ])
      
      setPhases(phasesData)
      setTasks(tachesData)
      setRisks(risquesData)
      setDashboardStats(statsData)
    } catch (err) {
      setError('Erreur lors du chargement des données: ' + err.message)
      console.error('Erreur de chargement:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await ApiService.updateTache(taskId, updates)
      
      // Mettre à jour les tâches localement
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? updatedTask : task
        )
      )
      
      // Recharger les statistiques du dashboard
      const newStats = await ApiService.getDashboardStats()
      setDashboardStats(newStats)
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err)
      setError('Erreur lors de la mise à jour de la tâche')
    }
  }

  const getTasksByPhase = (phaseId) => {
    return tasks.filter(task => task.id_phase === phaseId)
  }

  const exportData = async () => {
    try {
      const data = await ApiService.exportData()
      const dataToExport = {
        ...data,
        exportDate: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
      })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `corep-tracker-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Erreur lors de l\'export:', err)
      setError('Erreur lors de l\'export des données')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Chargement des données...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <Button onClick={loadData}>Réessayer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                COREP Follow-up
              </h1>
              <p className="text-sm text-gray-600">
                Suivi de l'arrêté prudentiel - Production COREP
              </p>
            </div>
            <Button onClick={exportData} variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Tableau de bord</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Calendrier</span>
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Risques</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportation</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Administration</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {dashboardStats && (
              <Dashboard 
                phases={phases} 
                tasks={tasks} 
                risks={risks}
                stats={dashboardStats}
              />
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <div className="space-y-6">
              {phases.map((phase) => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  tasks={getTasksByPhase(phase.id)}
                  onTaskClick={handleTaskClick}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="risks">
            <RiskRegister risks={risks} />
          </TabsContent>

          <TabsContent value="export">
            <ExportPanel />
          </TabsContent>

          <TabsContent value="admin">
            <AdminPanel 
              phases={phases}
              tasks={tasks}
              risks={risks}
              onDataChange={loadData}
            />
          </TabsContent>
        </Tabs>

        <TaskModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdateTask={handleUpdateTask}
        />
      </main>
    </div>
  )
}

export default App
