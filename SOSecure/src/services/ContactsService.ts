import AsyncStorage from '@react-native-async-storage/async-storage';

export type Contact = { id: string; name: string; phone: string };
const STORAGE_KEY = 'SOSecure:contacts';

export async function getContacts(): Promise<Contact[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Contact[]; } catch { return []; }
}

export async function saveContacts(contacts: Contact[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export async function addOrUpdateContact(contact: Contact): Promise<boolean> {
  const contacts = await getContacts();
  const existsByPhone = contacts.find(c => c.phone === contact.phone && c.id !== contact.id);
  if (existsByPhone) return false;
  const idx = contacts.findIndex(c => c.id === contact.id);
  if (idx >= 0) {
    contacts[idx] = contact;
  } else {
    contacts.push(contact);
  }
  await saveContacts(contacts);
  return true;
}

export async function deleteContact(id: string): Promise<void> {
  const contacts = await getContacts();
  await saveContacts(contacts.filter(c => c.id !== id));
}

export async function preloadSampleContact(): Promise<void> {
  const contacts = await getContacts();
  if (contacts.length === 0) {
    await saveContacts([{ id: 'sample', name: 'Emergency Contact', phone: '+11234567890' }]);
  }
}