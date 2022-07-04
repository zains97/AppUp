import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import Test from './src/Screens/Test';
import TabNavScreen from './src/Screens/TabNavScreen';
import Login from './src/Screens/Login';

auth()
  .createUserWithEmailAndPassword('hassam@gmail.com', '123xyz')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
console.log('Current USER', auth().currentUser);

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  } else {
    return <TabNavScreen />;
  }
}

export default App;
