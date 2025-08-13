import {getContacts} from './ContactsService';
import {getCurrentPosition, buildGoogleMapsLink} from './LocationService';
import {sendSmsDirect} from './SmsService';

export async function triggerSOS(): Promise<number> {
  const contacts = await getContacts();
  const pos = await getCurrentPosition();
  if (!pos) return 0;
  const link = buildGoogleMapsLink(pos.coords.latitude, pos.coords.longitude);
  const message = `SOS! I am in danger. My current location: ${link}`;
  let sent = 0;
  for (const c of contacts) {
    try { await sendSmsDirect(c.phone, message); sent++; } catch {}
  }
  return sent;
}