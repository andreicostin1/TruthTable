import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import TruthTableGenerator from '../Generator/Generator';
import * as Font from 'expo-font';
import { NavigationEvents } from 'react-navigation';


import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	TextInput,
	Alert,
	Platform,
	Image,
	AsyncStorage,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
	const [entry, setEntry] = useState('');
	const [fontLoaded, setFontLoaded] = useState(false);
	const [gradStart, setGradStart] = useState('#5831F0');
	const [gradEnd, setGradEnd] = useState('#92CBF6');
	const [symbols, setSymbols] = useState(['A', 'B', 'C', 'D', 'X', 'Y', 'Z', 'W'])

	getGrad();

	useEffect(() => {
		if (fontLoaded) return;
		Font.loadAsync({
			Ubuntu: require('../../assets/fonts/Ubuntu-Regular.ttf'),
			UbuntuBold: require('../../assets/fonts/Ubuntu-Medium.ttf'),
		}).then(() => {
			setFontLoaded(true);
		});
	});

	async function getGrad() {
		try {
			const s = await AsyncStorage.getItem('gradStart');
			const e = await AsyncStorage.getItem('gradEnd');

			if (s !== null && e != null) {
				setGradStart(s);
				setGradEnd(e);
			}
		} catch (error) {
			Alert('Error');
		}
	}

	async function getSymbolsFromMem() {
		try {
			const s = await AsyncStorage.getItem('symbols');

			if (s !== null) {
				setSymbols(JSON.parse(s));
			}
		} catch (error) {
			Alert('Error');
		}
	}

	function getSymbols(x,y) {
		const list = [];
		for (let i = x; i < y; i++) {
			list.push(
				<TouchableOpacity
					key={Math.random()}
					onPress={() => {
						setEntry(entry + symbols[i]);
					}}>
					<View style={styles.inputLettersView}>
						<Text style={styles.inputText}>{symbols[i]}</Text>
					</View>
				</TouchableOpacity>
			);
		}
		return list
	}

	if (!fontLoaded) return null;

	return (
		<LinearGradient
			colors={[gradStart, gradEnd]}
			start={{ x: 1, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				paddingBottom: 20,
			}}>
			
			<View style={styles.infoView}>
				<Text style={styles.header}>Truth Table Generator</Text>
				<TouchableOpacity
					style={styles.infoButTouch}
					onPress={() => {
						navigation.navigate('Info', {
							gradStart,
							gradEnd,
						});
					}}>
					<Image
						style={styles.infoBut}
						source={require('../../assets/info.png')}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ alignSelf: 'flex-end', marginLeft: 10 }}
					onPress={() => {
						navigation.navigate('Settings', { getGrad, gradStart, gradEnd, symbols, getSymbolsFromMem });
					}}>
					<Image
						style={{ height: 30, width: 30 }}
						source={require('../../assets/settings.png')}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.bubble1}></View>
			<View style={styles.bubble3}></View>

			<View style={styles.page}>
				<View style={styles.input}>
					<View style={styles.bubble2}></View>
					<View style={styles.accentWrapper}>
						<View style={{ ...styles.accent, backgroundColor: gradEnd }}></View>
						<TextInput
							style={styles.entry}
							placeholder='Input formula'
							placeholderTextColor={gradEnd}
							autoCorrect={false}
							value={entry}
							multiline={true}
							editable={false}
						/>
					</View>
				</View>

				<View style={styles.inputGrid}>
					<View style={styles.inputRowView}>
						{getSymbols(0, 4)}
					</View>
					<View style={styles.inputRowView}>
						{getSymbols(4, 8)}
					</View>
					<View
						style={{
							...styles.inputRowView,
							marginVertical: 7,
							justifyContent: 'space-around',
							height: 30,
						}}>
						<TouchableOpacity
							style={{ ...styles.tf }}
							onPress={() => {
								setEntry(entry + 'true');
							}}>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									flex: 1,
								}}>
								<Text style={styles.tfText}>true</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.xor}
							onPress={() => {
								setEntry(entry + '⊕');
							}}>
							<View style={{}}>
								<Text style={styles.xorText}>⊕</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ ...styles.tf }}
							onPress={() => {
								setEntry(entry + 'false');
							}}>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									flex: 1,
								}}>
								<Text style={styles.tfText}>false</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ ...styles.inputRowView }}>
						<TouchableOpacity
							onPress={() => {
								setEntry(entry + '∧');
							}}>
							<View style={styles.inputSymbolsView}>
								<Text style={{ ...styles.inputSymbols, ...styles.andOr }}>
									∧
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setEntry(entry + '∨');
							}}>
							<View style={styles.inputSymbolsView}>
								<Text style={{ ...styles.inputSymbols, ...styles.andOr }}>
									∨
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setEntry(entry + '(');
							}}>
							<View style={styles.inputSymbolsView}>
								<Text style={styles.inputSymbols}>(</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setEntry(entry + ')');
							}}>
							<View style={styles.inputSymbolsView}>
								<Text style={styles.inputSymbols}>)</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.inputRowView}>
						<TouchableOpacity
							onPress={() => {
								setEntry(entry + '¬');
							}}>
							<View style={styles.inputSymbolsView}>
								<Text style={styles.inputSymbols}>¬</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setEntry(entry + '⇒');
							}}>
							<View style={styles.inputSymbolsView}>
								<Text style={styles.inputSymbols}>⇒</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setEntry(entry + '≡');
							}}>
							<View style={styles.inputSymbolsView}>
								<Text style={styles.inputEquiv}>≡</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								if (entry.length != 0 || entry != '') {
									if (
										entry.substring(entry.length - 4, entry.length) === 'true'
									) {
										setEntry(entry.substring(0, entry.length - 4));
									} else if (
										entry.substring(entry.length - 5, entry.length) === 'false'
									) {
										setEntry(entry.substring(0, entry.length - 5));
									} else {
										setEntry(entry.substring(0, entry.length - 1));
									}
								}
							}}
							onLongPress={() => {
								setEntry('');
							}}>
							<View style={styles.inputSymbolsView}>
								<Text style={styles.del}>Del</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					style={{ alignSelf: 'center' }}
					onPress={() => {
						if (entry.length > 0) {
							try {
								let formula = entry
									.replace(/true/g, 't')
									.replace(/false/g, 'f');

								navigation.navigate('TruthTable', {
									truthTable: new TruthTableGenerator(formula),
									gradStart,
									gradEnd,
								});
							} catch (e) {
								Alert.alert(
									e.message,
									'Please ensure your formula is well-formed!',
									[{ text: 'OK', onPress: async () => this.exit }],
									{ cancelable: false }
								);
							}
						} else {
							Alert.alert(
								'Invalid Formula',
								'Please enter a well formed formula',
								[{ text: 'OK', onPress: async () => this.exit }],
								{ cancelable: false }
							);
						}
					}}>
					<View style={styles.entryButton}>
						<Text style={{ ...styles.entryText, color: gradEnd }}>
							{' '}
							Generate{' '}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	page: {
		alignSelf: 'center',
		width: '100%',
		maxWidth: 400,
		paddingHorizontal: 20,
	},
	header: {
		color: 'white',
		fontSize: 24,
		marginRight: 10,
		fontFamily: 'UbuntuBold',
	},
	bubble1: {
		position: 'absolute',
		bottom: -35,
		left: -25,
		width: 210,
		height: 210,
		borderRadius: 105,
		backgroundColor: 'rgba(255,255,255,0.1)',
		zIndex: 0,
	},
	bubble2: {
		position: 'absolute',
		top: -45,
		right: -25,
		width: 110,
		height: 110,
		borderRadius: 55,
		backgroundColor: 'rgba(255,255,255,0.08)',
		zIndex: 0,
	},
	bubble3: {
		position: 'absolute',
		top: 30,
		left: 5,
		width: 60,
		height: 60,
		borderRadius: 39,
		backgroundColor: 'rgba(255,255,255,0.06)',
		zIndex: 0,
	},
	input: {
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 3 },
		zIndex: 10,
		elevation: 4,
		borderRadius: 5,
	},
	accentWrapper: {
		overflow: 'hidden',
	},
	accent: {
		position: 'absolute',
		top: ios() ? -3 : 0,
		left: -60,
		width: 68,
		height: 68,
		borderRadius: 34,
		zIndex: 99,
	},
	entry: {
		color: '#393939',
		paddingHorizontal: 30,
		paddingTop: 20,
		paddingVertical: 20,
		borderRadius: 5,
		backgroundColor: 'white',
		fontSize: 19,
		fontFamily: 'Ubuntu',
	},
	inputGrid: {
		backgroundColor: 'white',
		borderRadius: 5,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		marginBottom: 30,
		marginHorizontal: 11,
		paddingTop: 10,
		paddingBottom: 10,
	},
	entryButton: {
		alignSelf: 'center',
		paddingVertical: 13,
		paddingHorizontal: 19,
		borderRadius: 5,
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOpacity: 0.12,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 5 },
		elevation: 3,
	},
	entryText: {
		fontSize: 19,
		alignSelf: 'center',
		fontFamily: 'Ubuntu',
	},
	inputRowView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 25,
	},
	inputLettersView: {
		backgroundColor: '#F0F3F6',
		borderRadius: 10,
		height: 50,
		width: 50,
		marginVertical: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputText: {
		color: '#393939',
		fontSize: 16,
		fontFamily: 'Ubuntu',
	},
	inputSymbols: {
		color: '#393939',
		fontSize: 16,
	},
	inputEquiv: {
		color: '#393939',
		fontSize: 16,
	},
	inputSymbolsView: {
		backgroundColor: 'white',
		borderColor: '#DADDE4',
		borderWidth: 1,
		borderRadius: 10,
		height: 50,
		width: 50,
		marginVertical: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	andOr: {
		fontSize: ios() ? 20 : 16,
	},
	del: {
		color: 'red',
		fontSize: 16,
		fontFamily: 'Ubuntu',
	},
	tf: {
		flex: 2,
		backgroundColor: 'white',
		borderColor: '#DADDE4',
		borderWidth: 1,
		borderRadius: 8,
	},
	tfText: {
		color: '#393939',
		fontSize: 16,
		fontFamily: 'Ubuntu',
	},
	xor: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderColor: '#DADDE4',
		borderWidth: 1,
		borderRadius: 8,
		marginHorizontal: 10,
	},
	xorText: {
		color: '#393939',
		fontSize: 20,
	},
	infoView: {
		flexDirection: 'row',
		marginBottom: 60,
	},
	infoButTouch: {
		alignSelf: 'flex-end',
	},
	infoBut: {
		height: 30,
		width: 30,
	},
});

function ios() {
	return Platform.OS === 'ios';
}

export default HomeScreen;
