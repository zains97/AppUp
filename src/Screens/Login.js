import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
const {width, height} = Dimensions.get('screen');

const Login = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  const [text, onChangeText] = React.useState();
  const [password, setPassword] = React.useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  return (
    <View style={styles.parent}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <ImageBackground
        source={require('../../assets/images/auth-bg.png')}
        style={styles.imgBackground}
        resizeMode="contain">
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/arrow.png')}
            style={styles.button}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <SafeAreaView style={styles.welcome}>
          <Text style={styles.title}>Welcome Back</Text>
        </SafeAreaView>
      </ImageBackground>

      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <View style={styles.formInput}>
            <View style={styles.label}>
              <Text style={styles.labeltext}>Username</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Username"
            />
          </View>

          <View style={styles.formInput}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Password</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                name="password"
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                value={password}
                enablesReturnKeyAutomatically
                onChangeText={text => setPassword(text)}
              />
            </View>
          </View>

          <View style={styles.loginButton}>
            <TouchableOpacity
              onPress={() => {
                auth()
                  .signInWithEmailAndPassword(text, password)
                  .then(res => {
                    console.log('RES: ', res);
                    navigation.navigate('Home');
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUp}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}
              style={styles.appButtonContaineSecondry}>
              <Text style={styles.appButtonTextSecondry}>SignUp</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUp}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  imgBackground: {
    height: width * 0.544,
    width: '100%',
    marginTop: -2,
  },
  footer: {marginTop: 32, marginBottom: 49},

  signUp: {marginTop: 18},

  divider: {marginTop: 8},

  parent: {flex: 1, backgroundColor: '#FFF'},

  welcome: {width: 150, top: 58, left: 15},

  button: {tintColor: '#FFFFFF', height: '100%', width: '100%'},

  scrollView: {zIndex: 2},

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    fontFamily: 'Poppins-SemiBold',
  },

  loginButton: {marginTop: 30},

  forgotText: {
    color: '#03041D',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular',
    alignSelf: 'flex-end',
    marginTop: 8,
  },

  form: {
    paddingTop: 30,
    paddingHorizontal: 16,
  },

  formInput: {
    marginTop: 10,
  },

  backButton: {
    position: 'absolute',
    left: 30,
    top: 25,
    height: height / 55,
    width: width / 45,
  },
  input: {
    height: 45,
    margin: 12,
    width: '93%',
    borderWidth: 1,
    padding: 10,
    borderColor: '#D9E1E7',
    borderRadius: 8,
  },
  label: {
    marginLeft: 16,
    marginBottom: -5,
  },
  labelText: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#E76F51',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 12,
    width: '95%',
    marginLeft: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonContaineSecondry: {
    elevation: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 12,
    width: '95%',
    borderColor: '#E76F51',
    marginLeft: 10,
  },
  appButtonTextSecondry: {
    fontSize: 18,
    color: '#E76F51',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonContaineSecondry: {
    elevation: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 12,
    width: '95%',
    borderColor: '#E76F51',
    marginLeft: 10,
  },
  appButtonTextSecondry: {
    fontSize: 18,
    color: '#E76F51',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
