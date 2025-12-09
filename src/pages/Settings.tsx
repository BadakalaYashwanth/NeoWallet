
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Moon, Globe, Lock, Shield, CreditCard, Bell as BellIcon, Wallet, UserCog, PieChart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false); // Default to false for light theme focus
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [budgetAlertsEnabled, setBudgetAlertsEnabled] = useState(true);

  const handleToggleSetting = (
    setting: string,
    value: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(value);
    toast({
      title: `${setting} ${value ? 'enabled' : 'disabled'}`,
      description: `${setting} has been ${value ? 'turned on' : 'turned off'}`,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-primary tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Customize your account preferences and security options.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preferences */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-primary">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive app notifications</p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={(value) => handleToggleSetting('Notifications', value, setNotificationsEnabled)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Moon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                </div>
              </div>
              <Switch
                checked={darkModeEnabled}
                onCheckedChange={(value) => handleToggleSetting('Dark mode', value, setDarkModeEnabled)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BellIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive transaction emails</p>
                </div>
              </div>
              <Switch
                checked={emailAlertsEnabled}
                onCheckedChange={(value) => handleToggleSetting('Email alerts', value, setEmailAlertsEnabled)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <PieChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Budget Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when approaching limits</p>
                </div>
              </div>
              <Switch
                checked={budgetAlertsEnabled}
                onCheckedChange={(value) => handleToggleSetting('Budget alerts', value, setBudgetAlertsEnabled)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Language</p>
                  <p className="text-sm text-muted-foreground">English (US)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Security */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-primary">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Lock className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={(value) => handleToggleSetting('Two-factor authentication', value, setTwoFactorEnabled)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Shield className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Biometric Authentication</p>
                    <p className="text-sm text-muted-foreground">Use fingerprint or Face ID</p>
                  </div>
                </div>
                <Switch
                  checked={biometricEnabled}
                  onCheckedChange={(value) => handleToggleSetting('Biometric authentication', value, setBiometricEnabled)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <CreditCard className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Transaction Limits</p>
                    <p className="text-sm text-muted-foreground">₹50,000 per day</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Linked Accounts */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-primary">Linked Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <Wallet className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Bank Accounts</p>
                    <p className="text-sm text-muted-foreground">2 accounts linked</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <UserCog className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">UPI Settings</p>
                    <p className="text-sm text-muted-foreground">Manage UPI IDs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
