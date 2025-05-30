
import React from 'react';
import Header from '@/components/Header';
import DailyMissionCard from '@/components/DailyMissionCard';
import StreakTracker from '@/components/StreakTracker';
import QuizCard from '@/components/QuizCard';
import XPLevelPanel from '@/components/XPLevelPanel';
import BadgesCarousel from '@/components/BadgesCarousel';
import LearningJourney from '@/components/LearningJourney';
import DailyTipPanel from '@/components/DailyTipPanel';
import Leaderboard from '@/components/Leaderboard';
import WeeklyPunchCard from '@/components/WeeklyPunchCard';
import CalendarView from '@/components/CalendarView';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Hero Grid - Daily Mission, Streak, Quiz */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DailyMissionCard />
          <StreakTracker />
          <QuizCard />
        </div>

        {/* Progress Grid - XP, Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <XPLevelPanel />
          <BadgesCarousel />
        </div>

        {/* Learning Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LearningJourney />
          <DailyTipPanel />
        </div>

        {/* Community Grid - Leaderboard, Weekly Challenge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Leaderboard />
          <WeeklyPunchCard />
        </div>

        {/* Calendar - Full Width */}
        <div className="grid grid-cols-1 gap-6">
          <CalendarView />
        </div>
      </main>
    </div>
  );
};

export default Index;
