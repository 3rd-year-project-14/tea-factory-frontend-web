// import React from 'react';
// import { View, Text, Picker, StyleSheet } from 'react-native';
// import { useAuth } from '../contexts/AuthContext'; // adjust import path

// const UserSwitcher = () => {
//   const { user, setUser, allUsers } = useAuth();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Logged in as: {user.username}</Text>

//       <Picker
//         selectedValue={user.username}
//         style={styles.picker}
//         onValueChange={(value) => {
//           const selectedUser = allUsers.find(u => u.username === value);
//           setUser(selectedUser);
//         }}
//       >
//         {allUsers.map((u) => (
//           <Picker.Item key={u.username} label={`${u.username} (${u.role})`} value={u.username} />
//         ))}
//       </Picker>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     margin: 16,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
// });

// export default UserSwitcher;
