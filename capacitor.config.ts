
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.416830f42fd746e0be25f30b0fc53b73',
  appName: 'neowallet',
  webDir: 'dist',
  server: {
    url: 'https://416830f4-2fd7-46e0-be25-f30b0fc53b73.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false,
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
