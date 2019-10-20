import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import TruthTable from './src/screens/TruthTable';
import InfoScreen from './src/screens/InfoScreen';

const navigator = createStackNavigator(
	{
		Home: HomeScreen,
		TruthTable,
		Info: InfoScreen
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
