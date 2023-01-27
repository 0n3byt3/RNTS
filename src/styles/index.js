import { StyleSheet } from 'react-native';
import getConstants from './constants';
import getLayoutClasses from './layout';
import getBackgroundsClasses from './backgrounds';
import getTextClasses from './text';
import getBordersClasses from './borders';
import getSpacersClasses from './spacers';

const $ = getConstants();

const BaseStyles = {
	...getLayoutClasses($),
	...getBackgroundsClasses($),
	...getTextClasses($),
	...getBordersClasses($),
	...getSpacersClasses($),


	//constants
	Const: $,
};

export default BaseStyles;
