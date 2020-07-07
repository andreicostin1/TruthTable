import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
	StyleSheet,
	TouchableOpacity,
    Alert,
    View,
    Text,
	Image,
	AsyncStorage
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const grads = [
		['#5831F0', '#92CBF6'],
		['#20002c', '#cbb4d4'],
		['#34e89e', '#0f3443'],
		['#6190E8', '#A7BFE8'],
		['#200122', '#6f0000'],
		['#0575E6', '#021B79'],
		['#4568DC', '#B06AB3'],
		['#43C6AC', '#191654'],
		['#43C6AC', '#F8FFAE'],
		['#F0F2F0', '#000C40'],
		['#E8CBC0', '#636FA4'],
		['#DCE35B', '#45B649'],
		['#c0c0aa', '#1cefff'],
		['#9CECFB', '#0052D4'],
		['#3494E6', '#EC6EAD'],
		['#67B26F', '#4ca2cd'],
		['#ee0979', '#ff6a00'],
		['#00c3ff', '#ffff1c']
	];

const SettingsScreen = ({ navigation }) => {
	const getGrad = navigation.state.params.getGrad;
	const [gradS, setGradS] = useState(navigation.state.params.gradStart);
	const [gradE, setGradE] = useState(navigation.state.params.gradEnd);

	

	async function storeGradient(s, e) {
		try {
			if (s != null && e != null) {
				await AsyncStorage.setItem('gradStart', s);
				await AsyncStorage.setItem('gradEnd', e);
			}
		} catch (error) {
			Alert('Error');
		}
	}

	function displayGrads() {
		const list = [];
		for (const grad of grads) {
			list.push(
				<TouchableOpacity
					key={Math.random()}
					style={styles.gradTouch}
					onPress={() => {
						setGradS(grad[0]);
						setGradE(grad[1]);
						storeGradient(grad[0], grad[1]);
						getGrad();
					}}>
					<LinearGradient
						colors={[grad[0], grad[1]]}
						start={{ x: 1, y: 0 }}
						end={{ x: 0, y: 1 }}
						style={{ flex: 1 }}></LinearGradient>
				</TouchableOpacity>
			);
		}
		return list;
	}

	return (
		<LinearGradient
			colors={[gradS, gradE]}
			start={{ x: 1, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{ flex: 1 }}>
			<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 55 }}>
				<TouchableOpacity
					style={{ position: 'absolute', left: 20, width: 'auto' }}
					onPress={() => {
						navigation.goBack();
					}}>
					<Image
						style={styles.backBut}
						source={require('../../assets/back.png')}
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>Settings: Choose a Background</Text>
			</View>
			<ScrollView style={{ marginTop: 10, paddingHorizontal: 10 }}>
				{displayGrads()}
			</ScrollView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	gradTouch: {
		height: 100,
		marginTop: 30,
		borderColor: 'black',
		borderWidth: 1
	},
	backBut: {
		height: 30,
		width: 30
    },
    headerText: {
		fontSize: 18,
		color: '#fff',
		fontFamily: 'UbuntuBold'
	}
});

export default SettingsScreen;
