
import React from 'react';
import Layout from '@/components/Layout';
import { QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TelegramBot = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="border-border dark:border-gray-700">
          <CardHeader>
            <CardTitle>DeFi Navigator Telegram Bot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              Access powerful DeFi analytics on the go with our Telegram bot. Get real-time position updates,
              price alerts, and manage your DeFi positions directly from Telegram.
            </p>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-64 h-64 bg-secondary/50 dark:bg-gray-800/50 flex items-center justify-center border border-border dark:border-gray-700 rounded-lg">
                <QrCode className="w-40 h-40 text-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="aspect-[4/3] bg-secondary/30 dark:bg-gray-700/30 rounded-lg border border-border dark:border-gray-700 flex items-center justify-center overflow-hidden">
                    <div className="text-xl text-muted-foreground">Screenshot {idx}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Real-time position updates and notifications</li>
                <li>Price alerts for your favorite tokens</li>
                <li>Portfolio analytics on the go</li>
                <li>Quick actions for managing liquidity positions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TelegramBot;
