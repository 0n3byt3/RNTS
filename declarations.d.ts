declare module "*.svg" {
	import React from 'react';
	import type {SvgProps} from "react-native-svg";
	declare const content = (props: SvgProps) => JSX.Element;
	export default content;
}
