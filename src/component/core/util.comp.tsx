import type {PropsWithChildren} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icons from './fa-icons';
import type {SvgElement} from './fa-icons';
import $$ from '../../styles';

type FAProps = {
	icon: string,
	family?: string,
	fill?: string,
	scale?: number,
};
export function FA({icon, family = 'fad', fill = '#000', scale = .65}: FAProps): JSX.Element  {
	const Icon: SvgElement = Icons[family][icon];

	return (
		<Icon fill={fill} width={40 * scale} height={32 * scale}/>
	);
}

const NoItemMsgStyle = StyleSheet.create({
	wrapper: {
		...$$.px3,
		...$$.py2
	},
	msg: {
		...$$.fstItalic,
		...$$.textAlignCenter,
		...$$.bgWarning2,
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
