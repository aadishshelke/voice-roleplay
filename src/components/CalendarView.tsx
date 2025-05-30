import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CalendarView = () => {
  const [currentMonth] = useState('April 2024');
  
  const calendarData = [
    { date: 1, status: 'completed', lesson: 'Sales Basics' },
    { date: 2, status: 'completed', lesson: 'Customer Handling' },
    { date: 3, status: 'completed', lesson: 'Closing Techniques' },
    { date: 4, status: 'completed', lesson: 'Follow-up Strategies' },
    { date: 5, status: 'missed', lesson: null },
    { date: 6, status: 'current', lesson: 'How to Close Faster' },
  ];

  const getDayStatus = (date: number) => {
    const day = calendarData.find(d => d.date === date);
    return day?.status || 'upcoming';
  };

  const getDayLesson = (date: number) => {
    const day = calendarData.find(d => d.date === date);
    return day?.lesson;
  };

  const renderCalendarDay = (date: number) => {
    const status = getDayStatus(date);
    const lesson = getDayLesson(date);
    
    const getStatusColor = () => {
      switch (status) {
        case 'completed': return 'bg-gromo-success text-white';
        case 'missed': return 'bg-red-500 text-white';
        case 'current': return 'bg-gromo-primary text-white ring-4 ring-blue-200';
        default: return 'bg-gray-100 text-gray-600';
      }
    };

    return (
      <TooltipProvider key={date}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-300 hover:scale-105 ${getStatusColor()}`}>
              {status === 'completed' ? '✅' : status === 'missed' ? '❌' : date}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {status === 'completed' && lesson ? `✅ Completed: ${lesson}` :
               status === 'missed' ? '❌ Missed day' :
               status === 'current' ? `📍 Today: ${lesson}` :
               'Upcoming'}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const weekdays = [
    { label: 'M', fullName: 'Monday' },
    { label: 'T', fullName: 'Tuesday' },
    { label: 'W', fullName: 'Wednesday' },
    { label: 'T', fullName: 'Thursday' },
    { label: 'F', fullName: 'Friday' },
    { label: 'S', fullName: 'Saturday' },
    { label: 'S', fullName: 'Sunday' }
  ];

  return (
    <Card className="p-6 space-y-4 card-hover">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">📅 Calendar View</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            ←
          </Button>
          <span className="font-semibold text-gromo-primary">{currentMonth}</span>
          <Button variant="outline" size="sm">
            →
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-600 mb-2">
        {weekdays.map((day, index) => (
          <div key={`${day.fullName}-${index}`} className="p-2">{day.label}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 30 }, (_, i) => i + 1).map(date => renderCalendarDay(date))}
      </div>

      <div className="flex items-center justify-center gap-4 text-sm text-gray-600 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gromo-success rounded"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Missed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gromo-primary rounded"></div>
          <span>Today</span>
        </div>
      </div>
    </Card>
  );
};

export default CalendarView;
