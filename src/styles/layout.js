export default function getClasses(constants) {
	const $ = constants;

	return {
		//layout
		w100: {
			width: '100%',
		},
		w50: {
			width: '50%',
		},
		h100: {
			height: '100%',
		},
		h50: {
			height: '50%',
		},
		flex0: {
			flex: 0,
		},
		flex1: {
			flex: 1,
		},
		flexWrap: {
			flexWrap: 'wrap',
		},
		flexWrapReverse: {
			flexWrap: 'wrap-reverse',
		},
		flexNoWrap: {
			flexWrap: 'nowrap',
		},
		flexGrow0: {
			flexGrow: 0,
		},
		flexGrow1: {
			flexGrow: 1,
		},
		flexShrink0: {
			flexShrink: 0,
		},
		flexShrink1: {
			flexShrink: 1,
		},
		flexRow: {
			flexDirection: 'row',
		},
		flexRowReverse: {
			flexDirection: 'row-reverse',
		},
		alignItemsCenter: {
			alignItems: 'center',
		},
		alignItemsStart: {
			alignItems: 'flex-start',
		},
		alignItemsEnd: {
			alignItems: 'flex-end',
		},
		justifyContentCenter: {
			justifyContent: 'center',
		},
		justifyContentEnd: {
			justifyContent: 'flex-end',
		},
		justifyContentStart: {
			justifyContent: 'flex-start',
		},
		justifyContentBetween: {
			justifyContent: 'space-between'
		},
	};
}
