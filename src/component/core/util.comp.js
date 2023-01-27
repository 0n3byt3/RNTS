import React, {useRef} from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import Icons from './fa-icons.js';
import * as Btn from './button.comp.tsx';
import $$ from 'style.tsx';

export function FA({icon = '', family = 'fad', fill = '#000', scale = .65}) {
	const Icon = Icons[family][icon];

	return (
		<Icon fill={fill} width={40 * scale} height={32 * scale}/>
	);
}

export function Spinner({family = 'fad', fill = '#000', scale = .65}) {
	const Icon = Icons[family]['spinner'];
	const spinValue = useRef(new Animated.Value(0)).current;

	Animated.loop(
		Animated.timing(spinValue, {
		    toValue: 1,
		    duration: 1000,
		    useNativeDriver: true,
			easing: Easing.linear
		})
	).start();

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg']
	});

	return (
		<Animated.View style={[{ transform: [{rotate: spin}] }]}>
			<Icon fill={fill} width={40 * scale} height={32 * scale}/>
		</Animated.View>
	);
}

const BaseMsgStyle = StyleSheet.create({
	wrapper: {
		...$$.bgSecondary2,
		...$$.h100,
		...$$.w100,
	},
	body: {
		...$$.bgTheme,
		...$$.border,
		...$$.rounded3,
		...$$.p3,
		...$$.flexRowReverse,
		...$$.alignItemsCenter,
		...$$.mAuto,
		borderStyle: 'dashed',
		borderWidth: $$.Const.BorderWidth * 4,
	},
});
export function BaseMsg({style = {}, children}) {
	return (
		<View style={[BaseMsgStyle.wrapper, style]}>
			<View style={BaseMsgStyle.body}>
				{children}
			</View>
		</View>
	);
}

export function LoadingMsg({style = {}}) {
	return (
		<BaseMsg style={style}>
			<Text style={[$$.ffLight, $$.textThemeReverse, $$.textAlignCenter]}>
				در حال بارگذاری اطلاعات...
			</Text>
		</BaseMsg>
	);
}

export function ConnErrorMsg({style = {}, onRetry = f=>f}) {
	return (
		<BaseMsg style={style}>
			<Text style={[$$.ffLight, $$.textThemeReverse, $$.textAlignCenter]}>
				خطا در برقراری ارتباط!
			</Text>
			<Btn.Tertiary
				style={[$$.mx1]}
				text="تلاش مجدد"
				onPress={onRetry}
			/>
		</BaseMsg>
	);
}

export function NoItemMsg({style = {}, itemName = 'آیتمی'}) {
	return (
		<BaseMsg style={style}>
			<Text style={[$$.ffLight, $$.textThemeReverse, $$.textAlignCenter]}>
				{`هیچ ${itemName} یافت نشد.`}
			</Text>
		</BaseMsg>
	);
}
