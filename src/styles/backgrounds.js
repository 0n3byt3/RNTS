export default function getClasses(constants) {
	const $ = constants;

	return {
		bgNone: {
			backgroundColor: 'transparent',
		},
		bgTheme: {
			backgroundColor: $.Col.theme,
		},
		bgThemeReverse: {
			backgroundColor: $.Col.themeReverse,
		},
		bgThemer: {
			backgroundColor: $.Col.themer,
		},
		bgThemerReverse: {
			backgroundColor: $.Col.themerReverse,
		},
		bgPrimary: {
			backgroundColor: $.Col.primary,
		},
		bgPrimaryReverse: {
			backgroundColor: $.Col.primaryReverse,
		},
		bgSecondary: {
			backgroundColor: $.Col.secondary,
		},
		bgSecondary2: {
			backgroundColor: $.Col.secondary2,
		},
		bgDanger1: {
			backgroundColor: $.Col.danger1,
		},
		bgDanger2: {
			backgroundColor: $.Col.danger2,
		},
		bgSuccess1: {
			backgroundColor: $.Col.success1,
		},
		bgSuccess2: {
			backgroundColor: $.Col.success2,
		},
		bgWarning1: {
			backgroundColor: $.Col.warning1,
		},
		bgWarning2: {
			backgroundColor: $.Col.warning2,
		},
		bgInfo1: {
			backgroundColor: $.Col.info1,
		},
		bgInfo2: {
			backgroundColor: $.Col.info2,
		},
	};
}
