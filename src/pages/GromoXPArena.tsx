import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import PodiumSection from '@/components/PodiumSection';
import MyRankSidebar from '@/components/MyRankSidebar';
import LeaderboardTable from '@/components/LeaderboardTable';
import GamificationSection from '@/components/GamificationSection';
import CallToActionCards from '@/components/CallToActionCards';
import StreakTracker from '@/components/StreakTracker';
import QuizCard from '@/components/QuizCard';
import XPLevelPanel from '@/components/XPLevelPanel';
import AchievementsPanel from '@/components/AchievementsPanel';
import RecentActivityPanel from '@/components/RecentActivityPanel';

const GromoXPArena = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Mobile Priority Sections */}
        <div className="space-y-4 md:hidden">
          <MyRankSidebar />
          <XPLevelPanel />
          <StreakTracker />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left Sidebar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <MyRankSidebar />
            <StreakTracker />
            <QuizCard />
          </div>

          {/* Main Content - Full width on mobile, 6 columns on desktop */}
          <div className="lg:col-span-6 space-y-4 md:space-y-6">
            <PodiumSection />
            <LeaderboardTable />
            <GamificationSection />
          </div>

          {/* Right Sidebar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <XPLevelPanel />
            <AchievementsPanel />
            <RecentActivityPanel />
          </div>
        </div>

        {/* Mobile Secondary Sections */}
        <div className="space-y-4 mt-4 md:hidden">
          <QuizCard />
          <AchievementsPanel />
          <RecentActivityPanel />
        </div>

        {/* Bottom Section - Full width */}
        <div className="mt-6 md:mt-8">
          <CallToActionCards />
        </div>
      </main>
    </div>
  );
};

export default GromoXPArena; 