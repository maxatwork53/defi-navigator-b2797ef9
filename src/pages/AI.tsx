
import React from 'react';
import Layout from '@/components/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { formatCurrency, formatDuration } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Clock, BarChart2, RefreshCw } from 'lucide-react';

// Mock data for AI Reports
const mockReports = [
  { id: '1', title: 'Weekly Portfolio Performance', date: '2023-06-15', status: 'completed' },
  { id: '2', title: 'ETH/USDC Position Analysis', date: '2023-06-12', status: 'completed' },
  { id: '3', title: 'Market Volatility Report', date: '2023-06-08', status: 'completed' },
  { id: '4', title: 'Optimized Fee Range Suggestions', date: '2023-06-05', status: 'completed' },
  { id: '5', title: 'Impermanent Loss Analysis', date: '2023-06-01', status: 'completed' },
];

// Mock data for AI Schedule
const mockSchedule = [
  { id: '1', task: 'Weekly Portfolio Report', frequency: 'Weekly', nextRun: '2023-06-22', status: 'active' },
  { id: '2', title: 'Price Alert: ETH > $2,000', frequency: 'Daily', nextRun: '2023-06-16', status: 'active' },
  { id: '3', title: 'LP Position Rebalancing Check', frequency: 'Weekly', nextRun: '2023-06-19', status: 'active' },
  { id: '4', title: 'Gas Price Optimization Alert', frequency: 'Daily', nextRun: '2023-06-16', status: 'active' },
  { id: '5', title: 'Market Sentiment Analysis', frequency: 'Bi-Weekly', nextRun: '2023-06-29', status: 'active' },
];

const AI = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered insights and recommendations for your liquidity positions
          </p>
        </div>
        
        {/* Coming Soon Box - Moved to the top */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up">
            <h2 className="text-lg font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              Our AI assistant will soon provide personalized recommendations and insights
              based on your liquidity positions and market conditions.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up">
            <h2 className="text-lg font-semibold mb-4">Position Recommendations</h2>
            <p className="text-muted-foreground mb-4">
              Our AI analyzes market conditions and your portfolio to suggest optimal liquidity positions.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">ETH/USDC 0.05% Pool</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                    High Confidence
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on your portfolio and recent price stability, adding liquidity to ETH/USDC with a ±1.5% range around the current price could yield 18-22% APY.
                </p>
              </div>
              
              <div className="p-4 border border-border rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">WBTC/ETH 0.3% Pool</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground">
                    Medium Confidence
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Historical correlation between these assets suggests a ±4% range would capture 85% of price movements while maximizing fee generation.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Reports Table */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">AI Reports</h2>
              <Button variant="outline" size="sm">
                <BarChart2 className="mr-2 h-4 w-4" />
                Request New Report
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Date Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
        
        {/* AI Schedule Table */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">AI Schedule</h2>
              <Button variant="outline" size="sm">
                <Clock className="mr-2 h-4 w-4" />
                Schedule Task
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSchedule.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.task || task.title}</TableCell>
                      <TableCell>{task.frequency}</TableCell>
                      <TableCell>{task.nextRun}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                          {task.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AI;
