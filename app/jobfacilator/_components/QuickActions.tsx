import { Button } from "@/components/ui/button"
import { Bell, ChartBar, Plus, Search } from "lucide-react"

const QuickActions = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
    <div className="h-auto bg-white border border-black rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
        <h1 className="text-lg sm:text-xl font-bold mb-6">Quick Actions</h1>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 ">
        <Button className="p-6 flex justify-start text-base font-medium items-center w-full h-14 sm:h-16  hover:shadow-md transition-shadow"><Plus/>Post a New Job</Button>
        <Button className="p-6 flex justify-start text-base font-medium items-center w-full h-14 sm:h-16  hover:shadow-md transition-shadow "><Search/>Search Candidates</Button>
        <Button className="p-6 flex justify-start text-base font-medium items-center w-full h-14 sm:h-16  hover:shadow-md transition-shadow "><ChartBar/>View Analytics</Button>
       <Button className="p-6 flex justify-start text-base font-medium items-center w-full h-14 sm:h-16  hover:shadow-md transition-shadow "><Bell/>Notifications</Button>

        </div>
    </div>
    </div>
  )
}

export default QuickActions