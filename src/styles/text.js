export default function getClasses(constants) {
	const $ = constants;

	return {
		//text colors
		textTheme: {
			color: $.Col.theme,
		},
		textThemeReverse: {
			color: $.Col.themeReverse,
		},
		textPrimary: {
			color: $.Col.primary,
		},
		textPrimaryReverse: {
			color: $.Col.primaryReverse,
		},
		textSecondary: {
			color: $.Col.secondary,
		},
		textDanger1: {
			color: $.Col.danger1,
		},
		textDanger2: {
			color: $.Col.danger2,
		},
		textSuccess1: {
			color: $.Col.success1,
		},
		textSuccess2: {
			color: $.Col.success2,
		},
		textWarning1: {
			color: $.Col.warning1,
		},
		textWarning2: {
			color: $.Col.warning2,
		},
		textInfo1: {
			color: $.Col.info1,
		},
		textInfo2: {
			color: $.Col.info2,
		},

		//text alignment
		textAlignCenter: {
			textAlign: 'center',
		},
		textAlignRight: {
			textAlign: 'right',
		},
		textAlignLeft: {
			textAlign: 'left',
		},

		//text fontSize
		fs1: {
			fontSize: $.FontSizeBase * 2.5,
		},
		fs2: {
			fontSize: $.FontSizeBase * 2,
		},
		fs3: {
			fontSize: $.FontSizeBase * 1.75,
		},
		fs4: {
			fontSize: $.FontSizeBase * 1.5,
		},
		fs5: {
			fontSize: $.FontSizeBase * 1.25,
		},
		fs6: {
			fontSize: $.FontSizeBase,
		},

		//text fontStyle
		fstItalic: {
	 	   fontStyle: 'italic',
		},

		//text fontWeight
		fwBold: {
	 	   fontWeight: '700',
		},

		//text fontFamily
		ffLight: {
			fontFamily: 'Roboto-Light',
			fontWeight: '400',
		},
		ffBold: {
			fontFamily: 'Roboto-Bold',
		},
	};
}
