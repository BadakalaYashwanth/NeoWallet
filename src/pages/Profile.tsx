
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Wallet, Calendar, CreditCard, Clock } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-primary tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account information and preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 bg-primary/10 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">Personal Information</h3>
                <p className="text-sm text-muted-foreground">Your basic profile details</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="font-semibold text-foreground text-lg">Yashwanth</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground text-lg">abcd@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground text-lg">910 234 9687</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground text-lg">India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary">Account Details</h3>
              <p className="text-sm text-muted-foreground">Overview of your account status</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/40 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                    <p className="font-semibold text-foreground">January 2024</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/40 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Wallet className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Default Wallet</p>
                    <p className="font-semibold text-foreground">Personal Wallet (₹50,000 limit)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/40 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Linked Banks</p>
                    <p className="font-semibold text-foreground">2 accounts linked</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/40 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Activity</p>
                    <p className="font-semibold text-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
