import { Application } from '@/app/types/types'

interface iRecentApplication {
  application: Application
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  INTERVIEW: { bg: 'bg-green-100', text: 'text-green-800' },
  SCREENING: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  PENDING: { bg: 'bg-blue-100', text: 'text-blue-800' },
  REJECTED: { bg: 'bg-red-100', text: 'text-red-800' },
}

const RecentApplication = ({ application }: iRecentApplication) => {
  const status = application.status
  const style = statusStyles[status] || { bg: 'bg-gray-100', text: 'text-gray-800' }

  return (
    <div className='w-full bg-white border border-border rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 transition-shadow hover:shadow-md'>
      <div className='flex flex-col gap-3 min-w-0'>
        <h1 className='text-lg sm:text-xl lg:text-2xl font-medium font-playfair truncate'>Recent Applications</h1>
        <p className="text-sm sm:text-base text-muted-foreground">{application.job.facilitator.company_name}</p>
        <p className='text-sm text-muted-foreground'>{new Date(application.appliedAt).toDateString()}</p>
      </div>
      <div className='flex sm:items-center'>
        <span className={`${style.bg} ${style.text} text-xs sm:text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap`}>
          {status}
        </span>
      </div>
    </div>
  )
}

export default RecentApplication
