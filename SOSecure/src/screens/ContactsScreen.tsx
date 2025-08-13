import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {addOrUpdateContact, Contact, deleteContact, getContacts} from '../services/ContactsService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useThemedColors} from '../utils/theme';
import {v4 as uuidv4} from 'uuid';

export default function ContactsScreen() {
  const theme = useThemedColors();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const load = async () => setContacts(await getContacts());
  useEffect(() => { load(); }, []);

  const onAdd = async () => {
    if (!name.trim() || !phone.trim()) return;
    const ok = await addOrUpdateContact({id: uuidv4(), name: name.trim(), phone: phone.trim()});
    if (!ok) Alert.alert('Duplicate', 'This phone number already exists');
    setName(''); setPhone('');
    await load();
  };

  const onDelete = async (id: string) => {
    await deleteContact(id);
    await load();
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}> 
      <Text style={[styles.title, {color: theme.text}]}>Emergency Contacts</Text>
      <View style={styles.row}> 
        <TextInput placeholder="Name" placeholderTextColor="#888" value={name} onChangeText={setName} style={[styles.input, {color: theme.text, borderColor: theme.primary}]} />
        <TextInput placeholder="Phone" placeholderTextColor="#888" keyboardType="phone-pad" value={phone} onChangeText={setPhone} style={[styles.input, {color: theme.text, borderColor: theme.primary}]} />
        <Icon name="plus-circle" size={40} color={theme.primary} onPress={onAdd} />
      </View>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <View>
              <Text style={[styles.name, {color: theme.text}]}>{item.name}</Text>
              <Text style={{color: theme.text}}>{item.phone}</Text>
            </View>
            <Icon name="delete" size={28} color={theme.primary} onPress={() => onDelete(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text style={{color: theme.text, textAlign: 'center', marginTop: 24}}>No contacts yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#444' },
  name: { fontSize: 16, fontWeight: '600' },
});