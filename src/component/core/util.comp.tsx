import {StyleSheet, Text, View} from 'react-native';
import $$ from '../../styles';

const NoItemMsgStyle = StyleSheet.create({
	wrapper: {
		...$$.px3,
		...$$.py2
	},
	msg: {
		...$$.fstItalic,
		...$$.textAlignCenter,
		...$$.bgWarning1,
		...$$.px3,
		...$$.py2,
		...$$.rounded2
	}
});
export function NoItemMsg(): JSX.Element {
	return (
		<View style={NoItemMsgStyle.wrapper}>
			<Text style={NoItemMsgStyle.msg}>No Items Yet!</Text>
		</View>
	);
}
