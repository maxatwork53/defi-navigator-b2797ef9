
import React from 'react';
import Layout from '@/components/Layout';
import { QrCode, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const TelegramBot = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="border border-border dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle>DeFi Navigator Telegram Bot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              Access powerful DeFi analytics on the go with our Telegram bot. Get real-time position updates,
              price alerts, and manage your DeFi positions directly from Telegram.
            </p>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">Features:</h3>
                <ul className="list-none space-y-1 ml-2">
                  <li className="flex items-center"><Check className="h-5 w-5 text-success mr-2" />Real-time position updates and notifications</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-success mr-2" />Price alerts for your favorite tokens</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-success mr-2" />Portfolio analytics on the go</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-success mr-2" />Quick actions for managing liquidity positions</li>
                </ul>
              </div>
              
              <div className="flex-shrink-0 w-64 h-64 bg-gradient-to-br from-secondary/30 to-primary/20 dark:from-gray-700/50 dark:to-primary/20 rounded-lg border border-border dark:border-gray-700 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <QrCode className="w-40 h-40 text-primary relative z-10" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-center bg-background/80 dark:bg-gray-800/80 p-1 rounded backdrop-blur-sm">
                  Scan to access bot
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="rounded-lg border border-border dark:border-gray-700 overflow-hidden relative group hover:shadow-md transition-all duration-300">
                  <AspectRatio ratio={9/16} className="bg-gradient-to-br from-secondary/20 to-background dark:from-gray-700/30 dark:to-gray-800/30">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5 group-hover:opacity-10 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-muted-foreground group-hover:text-primary transition-colors text-sm">
                        Telegram Bot UI {idx}
                      </div>
                    </div>
                  </AspectRatio>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TelegramBot;
