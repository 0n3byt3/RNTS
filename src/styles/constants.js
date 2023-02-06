import {StyleSheet} from 'react-native';
import getColors from './colors';

let _theme = 'dark';
export function setTheme(theme) {
	_theme = theme;
};

export default function getConstants(constantsOverride) {
	const _Col = getColors(_theme);
	const _Spacer = 14;

	return {
		//colors
		Col: {
			..._Col
		},

		//borders
		BorderColor: _Col.secondary,
		BorderWidth: StyleSheet.hairlineWidth,

		//spacers
		Spacers: {
			0: 0,
			1: (_Spacer * 0.25),
			2: (_Spacer * 0.5),
			3: (_Spacer * 1),
			4: (_Spacer * 1.5),
			5: (_Spacer * 3),
		},
		SpacersTypes: {margin: 'm', padding: 'p'},

		//text
		FontSizeBase: 10,

	};
}
