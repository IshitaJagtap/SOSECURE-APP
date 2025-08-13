declare module 'react-native' {
  interface NativeModulesStatic {
    SmsModule: {
      sendSms(phone: string, message: string): Promise<boolean>;
    };
  }
}