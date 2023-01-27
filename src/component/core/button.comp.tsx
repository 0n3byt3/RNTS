import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import $$ from '../../styles';

type BasicProps = PropsWithChildren<{
	text: string,
	textStyle: object,
	style: object,
	loading?: boolean,
	disabled?: boolean
}>;

const BasicStyle = StyleSheet.create({
	disabled: {
		opacity: .5,
	},
});
function Basic({text = '', textStyle = {}, style = {}, loading, disabled, ...props} :BasicProps): JSX.Element {
	let loadStyl = (loading || disabled)? BasicStyle.disabled : {};

	return (
		<TouchableOpacity
			style={[loadStyl, style]}
			disabled={loading? true : disabled}
			{...props}
	      >
		  	<Text style={textStyle}>
				{text}
			</Text>
		  </TouchableOpacity>
	);
}

const PrimaryStyle = StyleSheet.create({
	wrapper: {
		...$$.bgPrimary,
		alignItems: "center",
		justifyContent: "center",
	    paddingVertical: 5,
	    paddingHorizontal: 15,
		borderRadius: 50,
		flexDirection: 'row',
	},
	text: {
		...$$.textTheme,
		...$$.mx1,
		...$$.fs4,
		...$$.ffLight,
		textAlign: 'center',
	}
});
export function Primary({text = '', style = {}, ...props} :BasicProps): JSX.Element {
	return (
		<Basic
			style={[PrimaryStyle.wrapper, style]}
			text={text}
			textStyle={PrimaryStyle.text}
			{...props}
		/>
	);
}

const SecondaryStyle = StyleSheet.create({
	wrapper: {
		...PrimaryStyle.wrapper,
		...$$.bgNone,
		...$$.border,
		borderColor: $$.Const.Col.primary,
		borderWidth: $$.Const.BorderWidth * 5,
	},
	text: {
		...PrimaryStyle.text,
		...$$.textPrimary,
	}
});
export function Secondary({text = '', style = {}, ...props} :BasicProps): JSX.Element {
	return (
		<Basic
			style={[SecondaryStyle.wrapper, style]}
			text={text}
			textStyle={SecondaryStyle.text}
			{...props}
		/>
	);
}

const ActStyle = StyleSheet.create({
	wrapper: {
		...PrimaryStyle.wrapper,
		...$$.bgThemerReverse,
		...$$.px1,
		borderRadius: 8,
	},
	text: {
		...PrimaryStyle.text,
			...$$.textThemeReverse,
	}
});
export function Act({text = '', style = {}, ...props} :BasicProps): JSX.Element {
	return (
		<Basic
			style={[ActStyle.wrapper, style]}
			text={text}
			textStyle={SecondaryStyle.text}
			{...props}
		/>
	);
}
