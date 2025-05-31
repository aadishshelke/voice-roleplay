import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoleplayPractice from "@/pages/RoleplayPractice";
import RoleplayTraining from "@/pages/RoleplayTraining";
import MainLayout from '@/components/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Achievements from '@/pages/Achievements';
import VoiceChatCoach from './components/VoiceChatCoach';
import DailyLearning from './components/DailyLearning';
import { SavedScripts } from './components/SavedScripts';
import { Settings } from './components/Settings';
import { Analytics } from './components/Analytics';
import LearningModules from './components/LearningModules';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roleplay-practice" element={<RoleplayPractice />} />
          <Route path="/roleplay-training/:id" element={<RoleplayTraining />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="roleplay" element={<RoleplayPractice />} />
            <Route path="roleplay-practice" element={<RoleplayPractice />} />
            <Route path="roleplay-training/:id" element={<RoleplayTraining />} />
            <Route path="voice-chat" element={<VoiceChatCoach />} />
            <Route path="daily" element={<DailyLearning />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="scripts" element={<SavedScripts />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="learning-modules" element={<LearningModules />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
