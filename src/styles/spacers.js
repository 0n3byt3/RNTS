export default function getClasses(constants) {
	const $ = constants;
	const Classes = {
		mxAuto: {
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		myAuto: {
			marginTop: 'auto',
			marginBottom: 'auto',
		},
		mlAuto: {
			marginLeft: 'auto',
		},
		mrAuto: {
			marginRight: 'auto',
		},
		mtAuto: {
			marginTop: 'auto',
		},
		mbAuto: {
			marginBottom: 'auto',
		},
		mAuto: {
			marginLeft: 'auto',
			marginRight: 'auto',
			marginTop: 'auto',
			marginBottom: 'auto',
		}
	};

	Object.keys($.Spacers).forEach((itemSpacer) => {
		Object.keys($.SpacersTypes).forEach((itemType) => {
			Classes[$.SpacersTypes[itemType] + itemSpacer] = {[itemType]: $.Spacers[itemSpacer]};
			Classes[$.SpacersTypes[itemType] + 'y' + itemSpacer] = {[itemType + 'Vertical']: $.Spacers[itemSpacer]};
			Classes[$.SpacersTypes[itemType] + 'x' + itemSpacer] = {[itemType + 'Horizontal']: $.Spacers[itemSpacer]};
			Classes[$.SpacersTypes[itemType] + 't' + itemSpacer] = {[itemType + 'Top']: $.Spacers[itemSpacer]};
			Classes[$.SpacersTypes[itemType] + 'b' + itemSpacer] = {[itemType + 'Bottom']: $.Spacers[itemSpacer]};
			Classes[$.SpacersTypes[itemType] + 'r' + itemSpacer] = {[itemType + 'Right']: $.Spacers[itemSpacer]};
			Classes[$.SpacersTypes[itemType] + 'l' + itemSpacer] = {[itemType + 'Left']: $.Spacers[itemSpacer]};
		});
	});

	return Classes;
}
