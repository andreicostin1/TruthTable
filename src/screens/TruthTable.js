import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const TruthTable = function ({ navigation }) {
	const truthTable = navigation.state.params.truthTable;
	const gradStart = navigation.state.params.gradStart;
	const gradEnd = navigation.state.params.gradEnd;

	function tab() {
		const table = [];

		for (const [proposition, values] of truthTable) {
			const col = [];

			// header
			col.push(
				<View key={Math.random()} style={styles.borBot}>
					<Text style={styles.hCell}>
						{proposition.replace(/t/g, 'true').replace(/f/g, 'false')}
					</Text>
				</View>
			);

			for (const [i, value] of values.entries()) {
				col.push(
					<View
						key={Math.random()}
						style={{
							...(i == values.length - 1 ? styles.noBorBot : styles.borBot),
							...(i % 2 != 1 ? styles.grayBg : {}),
						}}>
						<Text style={styles.tCell}>{value ? 'T' : 'F'}</Text>
					</View>
				);
			}

			table.push(
				<View key={proposition} style={styles.tRow}>
					{col}
				</View>
			);
		}

		return table;
	}

	return (
		<LinearGradient
			colors={[gradStart, gradEnd]}
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
				<Text style={styles.headerText}>Truth Table</Text>
			</View>
			<View style={styles.page}>
				<View style={styles.wrapper}>
					<ScrollView
						directionalLockEnabled={false}
						alwaysBounceVertical={false}
						alwaysBounceHorizontal={false}
						showsVerticalScrollIndicator={false}
						style={styles.scrollView}
						contentContainerStyle={{ borderRadius: 20 }}>
						<ScrollView
							horizontal={true}
							alwaysBounceVertical={false}
							alwaysBounceHorizontal={false}
							showsVerticalScrollIndicator={false}
							style={styles.scrollView}
							contentContainerStyle={styles.tableContainer}>
							{tab()}
						</ScrollView>
					</ScrollView>
				</View>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
		marginTop: 15,
		padding: 15,
		paddingHorizontal: 0,
		paddingLeft: 2,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'Ubuntu',
	},
	wrapper: {
		padding: 10,
	},
	scrollView: {
		flexGrow: 0,
		flexBasis: 'auto',
		borderRadius: 10,
	},
	backBut: {
		height: 30,
		width: 30,
		marginLeft: 5,
	},
	tableContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		justifyContent: 'center',
		flexDirection: 'row',
		alignSelf: 'center',
		paddingHorizontal: 10,
		overflow: 'hidden',
	},
	headerText: {
		fontSize: 18,
		color: '#fff',
		fontFamily: 'UbuntuBold',
	},
	borBot: {
		borderBottomColor: 'rgba(0, 0, 0, 0.09)',
		borderBottomWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 35,
	},
	noBorBot: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 35,
	},
	tCell: {
		fontSize: 16,
		marginHorizontal: 15,
		color: '#444',
	},
	hCell: {
		fontSize: 18,
		fontFamily: 'UbuntuBold',
		marginHorizontal: 15,
	},
	grayBg: {
		backgroundColor: '#f6f6f6',
	},
});

export default TruthTable;
