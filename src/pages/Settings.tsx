
import { Card } from "@/components/ui/card";
import { Bell, Moon, Globe, Lock, Shield, CreditCard, Bell as BellIcon, Wallet, UserCog } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Settings</h1>
        <p className="text-secondary-foreground">Customize your account preferences</p>
      </header>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 text-white">Preferences</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">Notifications</p>
                <p className="text-sm text-gray-400">Receive app notifications</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">Dark Mode</p>
                <p className="text-sm text-gray-400">Toggle dark mode theme</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BellIcon className="h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">Email Alerts</p>
                <p className="text-sm text-gray-400">Receive transaction emails</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">Language</p>
                <p className="text-sm text-gray-400">English (US)</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 text-white">Security</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Add an extra layer of security</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">Biometric Authentication</p>
                <p className="text-sm text-gray-400">Use fingerprint or Face ID</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">Transaction Limits</p>
                <p className="text-sm text-gray-400">₹50,000 per day</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 text-white">Linked Accounts</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wallet className="h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">Bank Accounts</p>
                <p className="text-sm text-gray-400">2 accounts linked</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserCog className="h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">UPI Settings</p>
                <p className="text-sm text-gray-400">Manage UPI IDs</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
