import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CalendarProps {
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  className?: string
}

export function Calendar({ 
  selectedDate, 
  onDateSelect, 
  minDate, 
  maxDate, 
  className 
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  
  const today = new Date()
  const currentYear = currentMonth.getFullYear()
  const currentMonthIndex = currentMonth.getMonth()
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()
  
  // Generate days array
  const days = []
  
  // Add empty cells for days before first day of month
  for (let i = 0; i < firstDayWeekday; i++) {
    days.push(null)
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(currentYear, currentMonthIndex, day))
  }
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }
  
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    if (date < today) return true
    return false
  }
  
  const isDateSelected = (date: Date) => {
    return selectedDate && 
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear()
  }
  
  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }
  
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ]
  
  const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
  
  return (
    <div className={cn("bg-gray-900 border border-gray-800 rounded-lg p-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        
        <h3 className="text-white font-medium">
          {monthNames[currentMonthIndex]} {currentYear}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="h-10" />
          }
          
          const disabled = isDateDisabled(date)
          const selected = isDateSelected(date)
          const isTodayDate = isToday(date)
          
          return (
            <button
              key={index}
              onClick={() => !disabled && onDateSelect?.(date)}
              disabled={disabled}
              className={cn(
                "h-10 w-full text-sm rounded-lg transition-colors",
                "hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400",
                {
                  "text-gray-600 cursor-not-allowed": disabled,
                  "text-white hover:text-yellow-400": !disabled && !selected,
                  "bg-yellow-400 text-black hover:bg-yellow-300": selected,
                  "bg-gray-700 text-yellow-400": isTodayDate && !selected && !disabled,
                }
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  onStartDateSelect?: (date: Date) => void
  onEndDateSelect?: (date: Date | undefined) => void
  minDate?: Date
  maxDate?: Date
  className?: string
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateSelect,
  onEndDateSelect,
  minDate,
  maxDate,
  className
}: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [selectingEnd, setSelectingEnd] = React.useState(false)
  
  const today = new Date()
  const currentYear = currentMonth.getFullYear()
  const currentMonthIndex = currentMonth.getMonth()
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()
  
  // Generate days array
  const days = []
  
  // Add empty cells for days before first day of month
  for (let i = 0; i < firstDayWeekday; i++) {
    days.push(null)
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(currentYear, currentMonthIndex, day))
  }
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }
  
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    if (date < today) return true
    return false
  }
  
  const isDateSelected = (date: Date) => {
    if (startDate && date.getTime() === startDate.getTime()) return 'start'
    if (endDate && date.getTime() === endDate.getTime()) return 'end'
    if (startDate && endDate && date > startDate && date < endDate) return 'range'
    return false
  }
  
  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }
  
  const handleDateClick = (date: Date) => {
    if (!startDate || selectingEnd) {
      if (endDate && date < endDate) {
        onStartDateSelect?.(date)
        setSelectingEnd(false)
      } else if (!endDate) {
        onStartDateSelect?.(date)
        setSelectingEnd(true)
      }
    } else {
      if (date > startDate) {
        onEndDateSelect?.(date)
        setSelectingEnd(false)
      } else {
        onStartDateSelect?.(date)
        // Reset end date by calling with no parameter
        // onEndDateSelect?.(undefined)
        setSelectingEnd(true)
      }
    }
  }
  
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ]
  
  const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
  
  return (
    <div className={cn("bg-gray-900 border border-gray-800 rounded-lg p-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        
        <h3 className="text-white font-medium">
          {monthNames[currentMonthIndex]} {currentYear}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="h-10" />
          }
          
          const disabled = isDateDisabled(date)
          const selected = isDateSelected(date)
          const isTodayDate = isToday(date)
          
          return (
            <button
              key={index}
              onClick={() => !disabled && handleDateClick(date)}
              disabled={disabled}
              className={cn(
                "h-10 w-full text-sm rounded-lg transition-colors relative",
                "hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400",
                {
                  "text-gray-600 cursor-not-allowed": disabled,
                  "text-white hover:text-yellow-400": !disabled && !selected,
                  "bg-yellow-400 text-black hover:bg-yellow-300": selected === 'start' || selected === 'end',
                  "bg-yellow-400/20 text-yellow-400": selected === 'range',
                  "bg-gray-700 text-yellow-400": isTodayDate && !selected && !disabled,
                }
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
      
      {/* Selected dates display */}
      {(startDate || endDate) && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400 space-y-1">
            {startDate && (
              <div>Giriş: {startDate.toLocaleDateString('tr-TR')}</div>
            )}
            {endDate && (
              <div>Çıkış: {endDate.toLocaleDateString('tr-TR')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
