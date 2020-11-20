import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
	StyleSheet,
	TouchableOpacity,
	Alert,
	View,
	Text,
	Image,
	AsyncStorage,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const grads = [
	['#5831F0', '#92CBF6'],
	['#34e89e', '#0f3443'],
	['#0575E6', '#021B79'],
	['#43C6AC', '#F8FFAE'],
	['#c0c0aa', '#1cefff'],
	['#9CECFB', '#0052D4'],
	['#3494E6', '#EC6EAD'],
	['#ee0979', '#ff6a00'],
	['#00c3ff', '#ffff1c'],
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
		for (let i = 0; i < grads.length; i += 3) {
			const one = grads[i];
			const two = grads[i + 1];
			const three = grads[i + 2];
			list.push(
				<View style={styles.inputRowView} key={Math.random()}>
					<TouchableOpacity
						key={Math.random()}
						style={styles.gradTouch}
						onPress={() => {
							setGradS(one[0]);
							setGradE(one[1]);
							storeGradient(one[0], one[1]);
							getGrad();
						}}>
						<LinearGradient
							colors={[one[0], one[1]]}
							start={{ x: 1, y: 0 }}
							end={{ x: 0, y: 1 }}
							style={{ flex: 1, borderRadius: 50 }}></LinearGradient>
					</TouchableOpacity>

					<TouchableOpacity
						key={Math.random()}
						style={styles.gradTouch}
						onPress={() => {
							setGradS(two[0]);
							setGradE(two[1]);
							storeGradient(two[0], two[1]);
							getGrad();
						}}>
						<LinearGradient
							colors={[two[0], two[1]]}
							start={{ x: 1, y: 0 }}
							end={{ x: 0, y: 1 }}
							style={{ flex: 1, borderRadius: 50 }}></LinearGradient>
					</TouchableOpacity>

					<TouchableOpacity
						key={Math.random()}
						style={styles.gradTouch}
						onPress={() => {
							setGradS(three[0]);
							setGradE(three[1]);
							storeGradient(three[0], three[1]);
							getGrad();
						}}>
						<LinearGradient
							colors={[three[0], three[1]]}
							start={{ x: 1, y: 0 }}
							end={{ x: 0, y: 1 }}
							style={{ flex: 1, borderRadius: 50 }}></LinearGradient>
					</TouchableOpacity>
				</View>
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
			<View>
				
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 55,
				}}>
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
				<Text style={styles.headerText}>Settings</Text>
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
		width: 100,
		marginTop: 30,
		borderRadius: 50,
		borderColor: 'white',
		borderWidth: 2,
	},
	backBut: {
		height: 30,
		width: 30,
	},
	headerText: {
		fontSize: 18,
		color: '#fff',
		fontFamily: 'UbuntuBold',
	},
	inputRowView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 25,
	},
});

export default SettingsScreen;
