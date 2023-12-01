import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { FIREBASE_AUTH } from '../../utils/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const auth = FIREBASE_AUTH;

  const handleRegister = async() => {
    if (password !== confirmPassword) {
      setError('Password and confirm password do not match');
      return;
    }
    setLoading(true);

    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      navigation.navigate('Home', { user: user })
    } catch (err:any) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up With BolyCoin.</Text>

      <CustomInput
        label="Name"
        placeholder="Enter your full name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

     <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <CustomInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <CustomInput
        label="Confirm Password"
        placeholder=""
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />

      {loading ? <ActivityIndicator size="small" color="#3498db" /> : 
        <CustomButton title="Register" onPress={handleRegister} />
      }

      <Text style={{ marginVertical: 10, color: 'red'}}>{error}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text>Have an account? Login here</Text>
      </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
title: {
  fontSize: 24,
  marginBottom: 20,
}
});

export default Register;
