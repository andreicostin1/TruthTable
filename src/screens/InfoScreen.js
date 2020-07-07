import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import TruthTableGenerator from '../Generator/Generator';

import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const InfoScreen = ({ navigation }) => {
	const gradStart = navigation.state.params.gradStart;
	const gradEnd = navigation.state.params.gradEnd;
	return (
		<LinearGradient
			colors={[gradStart, gradEnd]}
			start={{ x: 1, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{ flex: 1, paddingHorizontal: 23 }}>
			<TouchableOpacity
				style={{
					width: 'auto',
					position: 'absolute',
					top: 55,
					left: 20
				}}
				onPress={() => {
					navigation.goBack();
				}}>
				<Image
					style={styles.backBut}
					source={require('../../assets/back.png')}
				/>
			</TouchableOpacity>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 70
				}}></View>
			<View style={styles.title}>
				<Text style={styles.titleText}>Symbols</Text>
			</View>
			<ScrollView style={styles.scrollView}>
				<View style={styles.border}>
					<Text style={styles.text}>AND : ∧ , &</Text>
				</View>
				<View style={styles.border}>
					<Text style={styles.text}>OR : ∨ , || , +</Text>
				</View>
				<View style={styles.border}>
					<Text style={styles.text}>NOT : ¬ , !</Text>
				</View>
				<View style={styles.border}>
					<Text style={styles.text}>XOR : ⊕</Text>
				</View>
				<View style={styles.border}>
					<Text style={styles.text}>IMPLICATION : ⇒</Text>
				</View>
				<View style={styles.border}>
					<Text style={styles.text}>EQUIVELANCE : ≡</Text>
				</View>

				<View style={styles.title}>
					<Text style={styles.titleText}>Example</Text>
				</View>

				<TouchableOpacity
					style={styles.borderTouch}
					onPress={() => {
						navigation.navigate('TruthTable', {
							truthTable: new TruthTableGenerator('¬(A∧B)≡¬A∨¬B'),
							gradStart,
							gradEnd
						});
					}}>
					<View style={{ ...styles.border, flex: 1, marginBottom: 5 }}>
						<View style={{ flexDirection: 'column' }}>
							<Text style={{ fontSize: 12, fontStyle: 'italic' }}>
								De Morgan's Law:
							</Text>
							<Text style={styles.text}>¬( A ∧ B ) ≡ ¬A ∨ ¬B</Text>
						</View>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	title: {
		marginTop: 30
	},
	scrollView: {
		flex: 1,
		width: '100%'
	},
	titleText: {
		fontSize: 22,
		color: 'white'
	},
	text: {
		fontSize: 18
	},
	backBut: {
		height: 30,
		width: 30
	},
	borderTouch: {
		flexDirection: 'row'
	},
	border: {
		borderRadius: 3,
		backgroundColor: 'white',
		flexDirection: 'row',
		marginTop: 10,
		paddingVertical: 15,
		paddingHorizontal: 20,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 3 },
		zIndex: 1,
		elevation: 4
	}
});

export default InfoScreen;
