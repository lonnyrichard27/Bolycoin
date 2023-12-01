import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCrypto from './screens/AddCrypto';
import Register from './screens/auth/Register';
import SignIn from './screens/auth/SignIn';
import Home from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Register'>
        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Add Crypto" 
          component={AddCrypto}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

