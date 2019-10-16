import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsNavigator from './SettingsNavigator';


const AppNavigator = createStackNavigator({
        LoginScreen: LoginScreen,
        ProfileScreen: ProfileScreen,
        RegistrationScreen: RegistrationScreen,
        MapScreen: MapScreen,
        SettingsScreen: SettingsNavigator
      })

export default createAppContainer(AppNavigator);