import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Bell, CheckCircle2, XCircle, Info, AlertTriangle, X, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type NotificationType = 'info' | 'success' | 'warning' | 'error'

interface Notification {
  id: number
  title: string
  description: string
  time: string
  type: NotificationType
  read: boolean
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'Jobs viewed', description: 'Your application has been viewd by company X', time: '5 min ago', type: 'success', read: false },
    { id: 2, title: 'System Update', description: '', time: '1 hour ago', type: 'info', read: false },
    { id: 3, title: 'Job is about to expire', description: 'Bookmarked jobs is about to expire', time: '2 hours ago', type: 'warning', read: true },
    { id: 4, title: '', description: 'Y', time: '5 hours ago', type: 'error', read: true },
    { id: 5, title: 'New Message', description: '', time: '1 day ago', type: 'info', read: true },
  ])

  const [showAll, setShowAll] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'error': return <XCircle className="h-5 w-5 text-red-600" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-600" />
      default: return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getAlertVariant = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'default'
      case 'error': return 'destructive'
      case 'warning': return 'default'
      default: return 'default'
    }
  }

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3)

  return (
    <div className="bg-white font-sans border border-gray-200 rounded-2xl shadow-lg p-4 md:p-6 
                    w-full max-w-full md:max-w-md lg:max-w-lg
                    flex flex-col h-[calc(100vh-2rem)] md:h-auto md:max-h-[600px]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-xl">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-gray-900">Notifications</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="font-normal">
                {unreadCount} unread
              </Badge>
              <span className="text-sm text-gray-500">
                {notifications.length} total
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={markAllAsRead}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Mark all read
        </Button>
      </div>

     
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {displayedNotifications.map((notification) => (
          <div 
            key={notification.id}
            className={`relative group p-4 rounded-xl transition-all duration-200 hover:shadow-md
              ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-l-blue-500'}`}
          >
            <div className="flex gap-3">
              <div className="mt-1 shrink-0">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <AlertTitle className={`font-semibold mb-1 ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                    {notification.title}
                  </AlertTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => clearNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <AlertDescription className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {notification.description}
                </AlertDescription>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">{notification.time}</span>
                  
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark read
                      </Button>
                    )}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        {notifications.length > 3 && (
          <Button
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `View All (${notifications.length})`}
          </Button>
        )}
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Button variant="outline" size="sm" className="text-sm">
            Settings
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            Notification History
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="rounded-full bg-gray-100 p-4 mb-4">
            <Bell className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">No notifications</h3>
          <p className="text-gray-500 text-sm">You're all caught up! Check back later for updates.</p>
        </div>
      )}
    </div>
  )
}

export default Notifications