import { Button } from "@/components/ui/button"
import { Bell, ChartBar, Plus, Search } from "lucide-react"

const QuickActions = () => {
  return (
    <div className="max-w-[593px] h-auto bg-white border border-black rounded-2xl flex flex-col gap-4 p-10">
        <h1 className="text-xl font-bold">Quick Actions</h1>
        <Button className="p-6 flex justify-center items-center"><Plus/>Post a New Job</Button>
        <Button className="p-6 flex justify-center items-center"><Search/>Search Candidates</Button>
        <Button className="p-6 flex justify-center items-center"><ChartBar/>View Analytics</Button>
       <Button className="p-6 flex justify-center items-center"><Bell/>Notifications</Button>
    </div>
  )
}

export default QuickActions