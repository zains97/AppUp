import firestore from '@react-native-firebase/firestore';

export const addUser = user => {
  firestore()
    .collection('Users')
    .add(user)
    .then(() => {
      console.log('User added!');
    });
};

export const updateUser = user => {};
