import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
	TextInput,
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
	['#9CECFB', '#0052D4'],
	['#0575E6', '#021B79'],
	['#5831F0', '#92CBF6'],
	['#43C6AC', '#F8FFAE'],
	['#c0c0aa', '#1cefff'],
	['#34e89e', '#0f3443'],
	['#3494E6', '#EC6EAD'],
	['#ee0979', '#ff6a00'],
	['#00c3ff', '#ffff1c'],
];

const SettingsScreen = ({ navigation }) => {
	const getGrad = navigation.state.params.getGrad;
	const [gradS, setGradS] = useState(navigation.state.params.gradStart);
	const [gradE, setGradE] = useState(navigation.state.params.gradEnd);
	const [symbols, setSymbols] = useState(navigation.state.params.symbols);
	const getSymbolsFromMem = navigation.state.params.getSymbolsFromMem;

	let symbs = symbols;

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

	async function storeSymbols() {
		try {
			await AsyncStorage.setItem('symbols', JSON.stringify(symbols));
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

	function displaySymbols(x, y) {
		const list = [];
		for (let i = x; i < y; i++) {
			list.push(
				<TextInput
					key={Math.random()}
					placeholder={symbs[i]}
					style={styles.inputLettersView}
					maxLength={1}
					onChangeText={(text) => {
						if ((text >= 'a' && text <= 'z') || (text >= 'A' && text <= 'Z') || text == '') {
							symbs[i] = text;
							setSymbols(symbs);
							storeSymbols(symbols);
							getSymbolsFromMem();
						} else {
							Alert.alert(
								'Invalid character, please enter only letters',
							);
						}
					}}
				/>
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
			<ScrollView style={{ marginTop: 5, paddingHorizontal: 10 }}>
				<View style={styles.customVar}>
					<Text style={{ ...styles.var }}>Variable Editor</Text>

					<View style={styles.inputRowView}>{displaySymbols(0, 4)}</View>
					<View style={styles.inputRowView}>{displaySymbols(4, 8)}</View>
				</View>

				<Text style={{ ...styles.var, paddingBottom: 20 }}>Theme</Text>

				{displayGrads()}
			</ScrollView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	gradTouch: {
		height: 100,
		width: 100,
		marginBottom: 30,
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
	inputText: {
		color: '#393939',
		fontSize: 16,
		fontFamily: 'Ubuntu',
	},
	inputLettersView: {
		backgroundColor: '#F0F3F6',
		borderRadius: 10,
		height: 50,
		width: 50,
		marginVertical: 4,
		textAlign: 'center',
	},
	customVar: {
		paddingVertical: 30,
		paddingHorizontal: 20,
	},
	var: {
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'UbuntuBold',
		color: 'white',
		paddingBottom: 20,
	},
});

export default SettingsScreen;
