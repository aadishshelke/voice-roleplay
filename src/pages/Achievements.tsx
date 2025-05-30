import React from 'react';
import Header from '@/components/Header';
import PodiumSection from '@/components/PodiumSection';
import MyRankSidebar from '@/components/MyRankSidebar';
import LeaderboardTable from '@/components/LeaderboardTable';
import GamificationSection from '@/components/GamificationSection';
import CallToActionCards from '@/components/CallToActionCards';

const Achievements = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto relative">
        {/* My Rank Sidebar - Fixed Position */}
        <MyRankSidebar />
        
        {/* Main Content */}
        <div className="mr-96">
          {/* Header */}
          <Header />
          
          {/* Top 3 Podium */}
          <PodiumSection />
          
          {/* Gamification Section */}
          <GamificationSection />
          
          {/* Leaderboard Table */}
          <div className="mb-8">
            <LeaderboardTable />
          </div>
          
          {/* Call to Action Cards */}
          <CallToActionCards />
        </div>
      </div>
      
      {/* Floating particles for extra visual appeal */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 left-40 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300 opacity-50"></div>
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-700 opacity-60"></div>
      </div>
    </div>
  );
};

export default Achievements; 