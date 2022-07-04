import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
  TouchableOpacity,
  StatusBar,
  Image,
  LogBox,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTogglePasswordVisibility} from '../Components/useTogglePasswordVisibility';
import {addUser} from '../Api/userApi';
const {width, height} = Dimensions.get('screen');

const SignUp = ({navigation}) => {
  const [name, onChangeName] = React.useState();
  const [email, setEmail] = React.useState();
  const [studentId, setStudentID] = React.useState();
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();
  const [password, setPassword] = React.useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

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
          <Text style={styles.title}>Create Account</Text>
        </SafeAreaView>
      </ImageBackground>

      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <View style={styles.formInput}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Name</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setName(text);
              }}
              value={name}
              placeholder="Name"
            />
          </View>
          <View style={styles.formInput}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
              placeholder="Email"
            />
          </View>

          <View style={styles.formInput}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Student ID</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setStudentID(text)}
              value={studentId}
              placeholder="Username"
            />
          </View>

          <View style={styles.formInput}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Password</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.input}
                name="password"
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                value={password}
                enablesReturnKeyAutomatically
                onChangeText={text => setPassword(text)}
              />
              <Pressable
                onPress={handlePasswordVisibility}
                style={{marginLeft: -50, top: 25}}></Pressable>
            </View>
          </View>

          <View style={styles.signUp}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={{alignSelf: 'center', marginTop: 15}}>
            <Text>OR</Text>
          </View>

          <View style={styles.signUp}>
            <TouchableOpacity
              onPress={() => {
                if (email && studentId && password) {
                  auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                      console.log('User account created & signed in!');
                      let temp = auth().currentUser;
                      addUser({email: temp.email, displayName: name});
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
                }
              }}
              style={styles.appButtonContaineSecondry}>
              <Text style={styles.appButtonTextSecondry}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

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
    marginBottom: 40,
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
});
