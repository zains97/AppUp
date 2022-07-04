import firestore from '@react-native-firebase/firestore';

export const addcourse = course => {
  firestore()
    .collection('Courses')
    .add(course)
    .then(() => {
      console.log('course added!');
    });
};
