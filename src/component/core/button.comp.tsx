import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import $$ from '../../styles';
import {FA} from './util.comp';

type BasicProps = PropsWithChildren<{
	text: string,
	textStyle?: object,
	icon: string,
	iconFamily: string,
	iconFill: string,
	style: object,
	loading?: boolean,
	disabled?: boolean
}>;

const BasicStyle = StyleSheet.create({
	disabled: {
		opacity: .5,
	},
});
function Basic({text = '', textStyle = {}, icon = '', iconFamily = 'fad', iconFill = '', style = {}, loading, disabled, ...props} :BasicProps): JSX.Element {
	let loadStyl = (loading || disabled)? BasicStyle.disabled : {};

	return (
		<TouchableOpacity
			style={[loadStyl, style]}
			disabled={loading? true : disabled}
			{...props}
	      >
		  	{!!icon &&
				<FA icon={icon} family={iconFamily} fill={iconFill}/>
			}
			{!!text &&
				<Text style={textStyle}>
					{text}
				</Text>
			}
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
export function Primary({text = '', iconFill, style = {}, ...props} :BasicProps): JSX.Element {
	return (
		<Basic
			style={[PrimaryStyle.wrapper, style]}
			text={text}
			textStyle={PrimaryStyle.text}
			iconFill={iconFill || $$.Const.Col.theme}
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
export function Secondary({text = '', iconFill, style = {}, ...props} :BasicProps): JSX.Element {
	return (
		<Basic
			style={[SecondaryStyle.wrapper, style]}
			text={text}
			textStyle={SecondaryStyle.text}
			iconFill={iconFill || $$.Const.Col.primary}
			{...props}
		/>
	);
}

const TertiaryStyle = StyleSheet.create({
	wrapper: {
		...PrimaryStyle.wrapper,
		...$$.bgNone,
		...$$.px0
	},
	text: {
		...PrimaryStyle.text,
		...$$.textPrimary,
	}
});
export function Tertiary({text = '', iconFill, style = {}, ...props} :BasicProps): JSX.Element {
	return (
		<Basic
			style={[TertiaryStyle.wrapper, style]}
			text={text}
			textStyle={TertiaryStyle.text}
			iconFill={iconFill || $$.Const.Col.primary}
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
export function Act({text = '', iconFill, style = {}, ...props} :BasicProps): JSX.Element {
	return (
		<Basic
			style={[ActStyle.wrapper, style]}
			text={text}
			textStyle={SecondaryStyle.text}
			iconFill={iconFill || $$.Const.Col.primary}
			{...props}
		/>
	);
}
