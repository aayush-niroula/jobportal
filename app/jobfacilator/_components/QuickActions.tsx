import { Button } from "@/components/ui/button"
import { Bell, BarChart3, Plus, Search } from "lucide-react"

const QuickActions = () => {
  const actions = [
    { icon: Plus, label: "Post a New Job" },
    { icon: Search, label: "Search Candidates" },
    { icon: BarChart3, label: "View Analytics" },
    { icon: Bell, label: "Notifications" }
  ]

  return (
    <div className="w-full">
      <div className="h-auto bg-white border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-lg font-bold mb-5 text-black">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button 
                key={index}
                className="p-4 flex justify-start text-sm font-medium items-center w-full h-12 bg-white text-black border-2 border-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all gap-2"
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuickActions