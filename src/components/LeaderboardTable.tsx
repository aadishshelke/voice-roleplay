import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const LeaderboardTable = () => {
  const users = [
    { rank: 1, name: "Priya Sharma", xp: 1250, badge: "🥇" },
    { rank: 2, name: "Rajesh Kumar", xp: 1180, badge: "🥈" },
    { rank: 3, name: "Anjali Patel", xp: 1050, badge: "🥉" },
    { rank: 4, name: "Vikram Singh", xp: 980, badge: "" },
    { rank: 5, name: "Sunita Reddy", xp: 920, badge: "" },
    { rank: 6, name: "Amit Patel", xp: 890, badge: "" },
    { rank: 7, name: "Neha Gupta", xp: 850, badge: "" },
    { rank: 8, name: "Rahul Verma", xp: 820, badge: "" },
    { rank: 9, name: "Pooja Shah", xp: 790, badge: "" },
    { rank: 10, name: "Suresh Kumar", xp: 760, badge: "" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Global Leaderboard</h2>
        <div className="text-sm text-gray-600">Updated 5 minutes ago</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">XP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.rank}
              className={user.rank <= 3 ? 'bg-gradient-to-r from-gromo-accent/10 to-yellow-400/10' : ''}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {user.badge || `#${user.rank}`}
                </div>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="text-right font-semibold">{user.xp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default LeaderboardTable; 