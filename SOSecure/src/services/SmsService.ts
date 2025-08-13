import {NativeModules} from 'react-native';

const {SmsModule} = NativeModules as {SmsModule: {sendSms: (phone: string, msg: string) => Promise<boolean>}};

export async function sendSmsDirect(phone: string, message: string): Promise<boolean> {
  return SmsModule.sendSms(phone, message);
}