export default function getClasses(constants) {
	const $ = constants;

	return {
		border: {
	      borderColor: $.BorderColor,
	      borderWidth: $.BorderWidth,
	      borderStyle: 'solid',
	    },

	    borderTop: {
	      borderTopColor: $.BorderColor,
	      borderTopWidth: $.BorderWidth,
	      borderTopStyle: 'solid',
	    },

	    borderRight: {
	      borderRightColor: $.BorderColor,
	      borderRightWidth: $.BorderWidth,
	      borderRightStyle: 'solid',
	    },

	    borderBottom: {
	      borderBottomColor: $.BorderColor,
	      borderBottomWidth: $.BorderWidth,
	      borderBottomStyle: 'solid',
	    },

	    borderLeft: {
	      borderLeftColor: $.BorderColor,
	      borderLeftWidth: $.BorderWidth,
	      borderLeftStyle: 'solid',
	    },

		rounded0: {
	 	   borderRadius: 0,
		},
		rounded1: {
	 	   borderRadius: 5,
		},
		rounded2: {
	 	   borderRadius: 10,
		},
		rounded3: {
	 	   borderRadius: 15,
		},
	};
}
