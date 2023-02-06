import type {PropsWithChildren} from 'react';
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import $$ from '../../styles';

type InputProps = PropsWithChildren<{
	style: [],
}>;
const InputStyle = StyleSheet.create({
	wrapper: {
		...$$.border,
		...$$.textThemeReverse,
		...$$.bgThemer,
		...$$.rounded2,
		...$$.px3
	},
});
export function Input({style = [], ...prop}: InputProps) {
	return (
		<TextInput
			style={[InputStyle.wrapper, ...style]}
			placeholderTextColor={$$.Const.Col.secondary}
			{...prop}
		/>
	);
}
