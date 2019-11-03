import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import TruthTable from './src/screens/TruthTable';
import InfoScreen from './src/screens/InfoScreen';
import SettingsScreen from './src/screens/SettingsScreen'

const navigator = createStackNavigator(
	{
		Home: HomeScreen,
		TruthTable,
		Info: InfoScreen,
		Settings: SettingsScreen
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

export default createAppContainer(navigator);
