
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';
import { 
  Bell, 
  BellOff, 
  Check, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  Languages, 
  MessageSquare, 
  Percent, 
  Save, 
  Settings as SettingsIcon, 
  User 
} from 'lucide-react';

type AlertPreference = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
};

type TelegramSetting = {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

const Settings = () => {
  const [alertPreferences, setAlertPreferences] = useState<AlertPreference[]>([
    {
      id: 'out-of-range',
      title: 'Out of Range Alerts',
      description: 'Get notified when your position is out of the price range',
      enabled: true,
      icon: <Percent className="w-5 h-5" />,
    },
    {
      id: 'price-alerts',
      title: 'Price Movement Alerts',
      description: 'Get notified on significant price movements',
      enabled: true,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: 'fee-collection',
      title: 'Fee Collection Reminders',
      description: 'Get reminders to collect accumulated fees',
      enabled: false,
      icon: <Clock className="w-5 h-5" />,
    },
  ]);

  const [telegramSettings, setTelegramSettings] = useState<TelegramSetting[]>([
    {
      id: 'telegram-username',
      title: 'Telegram Username',
      value: '@defi_user',
      description: 'Your Telegram username to receive notifications',
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 'notification-frequency',
      title: 'Notification Frequency',
      value: 'Immediate',
      description: 'How often you want to receive notifications',
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: 'notification-language',
      title: 'Notification Language',
      value: 'English',
      description: 'Language for your notifications',
      icon: <Languages className="w-5 h-5" />,
    },
  ]);

  const [telegramConnected, setTelegramConnected] = useState(true);

  const toggleAlertPreference = (id: string) => {
    setAlertPreferences(preferences =>
      preferences.map(pref =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your preferences and notification settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-full mr-4">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Alert Preferences</h2>
                  <p className="text-sm text-muted-foreground">Customize your alert notifications</p>
                </div>
              </div>

              <div className="space-y-5">
                {alertPreferences.map((preference) => (
                  <div key={preference.id} className="flex items-start">
                    <div className="flex items-center h-6 mt-0.5">
                      <button
                        onClick={() => toggleAlertPreference(preference.id)}
                        className={cn(
                          "w-10 h-5 relative rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                          preference.enabled ? "bg-primary" : "bg-muted"
                        )}
                      >
                        <span
                          className={cn(
                            "block w-4 h-4 bg-white rounded-full transform transition-transform",
                            preference.enabled ? "translate-x-5" : "translate-x-1"
                          )}
                        />
                      </button>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{preference.title}</span>
                        <div className="ml-2 text-muted-foreground">
                          {preference.icon}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{preference.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up delay-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-full mr-4">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Telegram Bot</h2>
                    <p className="text-sm text-muted-foreground">Connect with our Telegram bot</p>
                  </div>
                </div>

                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium flex items-center",
                  telegramConnected ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                )}>
                  {telegramConnected ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <BellOff className="w-3 h-3 mr-1" />
                      Disconnected
                    </>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <button className="w-full flex items-center justify-center space-x-2 py-2 bg-[#0088cc] hover:bg-[#0088cc]/90 text-white rounded-lg transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect to @DeFi_Navigator_Bot</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {telegramSettings.map((setting) => (
                  <div key={setting.id} className="flex items-start">
                    <div className="text-muted-foreground mt-0.5">
                      {setting.icon}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{setting.title}</span>
                        <span className="text-sm text-primary">{setting.value}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{setting.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up delay-200">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-primary/10 rounded-full mr-4">
                  <SettingsIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Wallet Addresses</h2>
                  <p className="text-sm text-muted-foreground">Manage your tracked wallet addresses</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                    readOnly
                    className="w-full pl-3 pr-10 py-2 rounded-lg border border-border bg-secondary/30 text-sm"
                  />
                  <button className="absolute right-2 top-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value="0x1a23BA45c6789dEFa1B2C3d45E6f78901a23b456"
                    readOnly
                    className="w-full pl-3 pr-10 py-2 rounded-lg border border-border bg-secondary/30 text-sm"
                  />
                  <button className="absolute right-2 top-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Add new wallet address"
                    className="w-full pl-3 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60 transition-all text-sm"
                  />
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    You can track up to 3 wallet addresses. The bot will monitor these addresses for liquidity positions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up delay-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-primary/10 rounded-full mr-4">
                  <Percent className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Range Thresholds</h2>
                  <p className="text-sm text-muted-foreground">Set your liquidity position thresholds</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Out of Range Alert Threshold</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60 transition-all">
                    <option>Immediate</option>
                    <option>After 15 minutes</option>
                    <option>After 30 minutes</option>
                    <option>After 1 hour</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    When to alert you after a position goes out of range
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price Movement Threshold</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60 transition-all">
                    <option>1%</option>
                    <option>3%</option>
                    <option>5%</option>
                    <option>10%</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum price change percentage to trigger an alert
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full flex items-center justify-center space-x-2 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
