
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="gromo-gradient text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">📚 GroMo</div>
          <div className="hidden sm:block text-sm opacity-90">Partner Learning Hub</div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white hover:bg-opacity-20">
            🔍
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white hover:bg-opacity-20">
            ☰
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
