import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import $$ from '../../styles';
import {Util} from '../core';
import {eventify} from '../../util';

type ToastStyle = "err" | "suc" | "warn";
interface ToastOpt {
	id?: number;
	age?: number;
	style?: ToastStyle;
	message?: string[] | string;
}
interface Toast {
	id: number;
	age: number;
	style: ToastStyle;
	message: string[] | string;
}
interface ToastApi {
	_cnt: number;
	_list: Toast[];
	_outDur: number;
	getOutDur: () => number;
	setOutDur: (duration: number) => void;
	fire: (eventName: string, data?: object) => Toast;
	on: (eventName: string, cb: (eventObj: object) => any) => void; // TODO: make eventObj type
	off: (eventName: string, cb: (eventObj: object) => any) => void;
	getList: () => Toast[];
	get: (id: number) => Toast;
	show: (op: ToastOpt) => void;
	hide: (id: number) => void;
	err: (msg: string[] | string, opt?: ToastOpt) => void;
	suc: (msg: string[] | string, opt?: ToastOpt) => void;
	warn: (msg: string[] | string, opt?: ToastOpt) => void;
}
interface ToastProp {
	message: string[] | string;
	style: object;
	toastAge: number;
	animated: boolean;
}

export const toast = eventify({
	_cnt: 5,
	_list: [],
	_outDur: 250,

	//get toast hiding duration
	getOutDur() {
		return this._outDur;
	},
	//set toast hiding duration
	setOutDur(dur: number) {
		this._outDur = dur;
	},
	//get toast list
	getList() {
		return this._list;
	},
	//get toast with given id
	get(id: number) {
		return this._list.filter((v: Toast) => v.id === id)[0];
	},
	//show toast with given opt
	show(op: ToastOpt) {
		this._cnt += 1;
		let t = {
			...op,
			id: this._cnt,
			age: op.age || 3000, //toast visibilty time(Must be bigger or eq to outDur = 250)
		};
		this._list.push(t);

		this.fire('add', {
			toast: t,
		});
	},
	//hide and remove toast
	hide(id: number) {
		if(!this.get(id))
			return;

		this._list = this._list.filter((v: Toast) => v.id !== id);
		this.fire('remove', {
			toastId: id,
		});
	},
	//error style toast
	err(msg: string[] | string, op: ToastOpt = {}) {
		this.show({
			...op,
			message: msg,
			style: 'err',
		});
	},
	//success style toast
	suc(msg: string[] | string, op: ToastOpt = {}) {
		this.show({
			...op,
			message: msg,
			style: 'suc',
		});
	},
	//warning style toast
	warn(msg: string[] | string, op: ToastOpt = {}) {
		this.show({
			...op,
			message: msg,
			style: 'warn',
		});
	}
} as any) as ToastApi;

const ToastContainerStyle = StyleSheet.create({
	wrapper: {
		...$$.px4,
		width: '100%',
		position: 'absolute',
		bottom: 20,
	},
});
export function ToastContainer(): JSX.Element | null {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const maxToast = 4; //max shown toasts
	const Styles = {
		err: Error,
		suc: Success,
		warn: Warning,
	};

	useEffect(() => {
		function onAdd(e: any): void {
			let list = toast.getList();
			if(list.length > maxToast) {
				toast.hide(list[0].id as number);
				list = toast.getList();
			}

			setTimeout(() => {
				toast.hide(e.toast.id);
			}, e.toast.age);

			return setToasts([...list]);
		}
		function onRemove(e: any): void {
			return setToasts([...toast.getList()]);
		}

		toast.on('add', onAdd);
		toast.on('remove', onRemove);

		return () => {
			toast.off('add', onAdd);
			toast.off('remove', onRemove);
		};
	}, [toasts]);

	return (
        !toasts.length
		? null
		: (<View style={ToastContainerStyle.wrapper}>
            {
				toasts.map((v, i) => {
					let Styl = Styles[v.style];
					return (
						<Styl message={v.message} key={v.id} style={(i > 0)? $$.mt3 : {}} toastAge={v.age} animated/>
					);
				})
			}
        </View>)
	);
}

const ErrorStyle = StyleSheet.create({
	wrapper: {
		...$$.border,
		...$$.flexRow,
		...$$.alignItemsCenter,
		...$$.bgDanger1,
		...$$.rounded1,
		...$$.px1,
		...$$.py2,
		borderColor: $$.Const.Col.danger2,
		borderWidth: $$.Const.BorderWidth,
		borderLeftWidth: $$.Const.BorderWidth * 15,
	},
	lSec: {
		...$$.flex1,
		borderLeftStyle: 'solid',
		borderLeftWidth: $$.Const.BorderWidth,
		borderColor: $$.Const.Col.danger2,
	}
});
export function Error({message = [], style = {}, toastAge, animated}: ToastProp): JSX.Element | null {
	const width = Dimensions.get('window').width;
	const leftVal = useRef(new Animated.Value(animated? width : 0)).current;
	message = (typeof message === 'string')? [message] : message;

	useEffect(() => {
		if(!animated)
			return;

		Animated.spring(leftVal, {
			toValue: 0,
			friction: 5,
			tension: 80,
			useNativeDriver: true,
		}).start(() => {
    		const outDur = toast.getOutDur();
    		setTimeout(() => {
    			Animated.timing(leftVal, {
    		      toValue: width,
    		      duration: outDur,
    			  useNativeDriver: true,
    		    }).start();
    		}, toastAge - outDur);
		});
	}, []);

	return (
		!message.length
		? null
		: (<Animated.View style={[ErrorStyle.wrapper, { transform: [{translateX: leftVal}] }, style]}>
			<View style={[$$.px2]}>
				<Util.FA icon="circleExclamation" fill={$$.Const.Col.danger2}/>
			</View>
			<View style={[ErrorStyle.lSec, $$.px3]}>
				{
					message.map((v, i) => (
						<Text key={i} style={[$$.ffLight, $$.textDanger2]}>
							{v}
						</Text>
					))
				}
			</View>
		</Animated.View>)
	);
}

const SuccessStyle = StyleSheet.create({
	wrapper: {
		...$$.border,
		...$$.flexRow,
		...$$.alignItemsCenter,
		...$$.bgSuccess1,
		...$$.rounded1,
		...$$.px1,
		...$$.py2,
		borderColor: $$.Const.Col.success2,
		borderWidth: $$.Const.BorderWidth,
		borderLeftWidth: $$.Const.BorderWidth * 15,
	},
	lSec: {
		...$$.flex1,
		borderLeftStyle: 'solid',
		borderLeftWidth: $$.Const.BorderWidth,
		borderColor: $$.Const.Col.success2,
	}
});
export function Success({message = [], style = {}, toastAge, animated}: ToastProp): JSX.Element | null {
	const width = Dimensions.get('window').width;
	const leftVal = useRef(new Animated.Value(animated? width : 0)).current;
	message = (typeof message === 'string')? [message] : message;

	useEffect(() => {
		if(!animated)
			return;

		Animated.spring(leftVal, {
			toValue: 0,
			friction: 5,
			tension: 80,
			useNativeDriver: true,
		}).start(() => {
			const outDur = toast.getOutDur();
			setTimeout(() => {
				Animated.timing(leftVal, {
			      toValue: width,
			      duration: outDur,
				  useNativeDriver: true,
			    }).start();
			}, toastAge - outDur);
		});
	}, []);

	return (
		!message.length
		? null
		: (<Animated.View style={[SuccessStyle.wrapper, { transform: [{translateX: leftVal}] }, style]}>
			<View style={[$$.px2]}>
				<Util.FA icon="circleExclamation" fill={$$.Const.Col.success2}/>
			</View>
			<View style={[SuccessStyle.lSec, $$.px3]}>
				{
					message.map((v, i) => (
						<Text key={i} style={[$$.ffLight, $$.textSuccess2]}>
							{v}
						</Text>
					))
				}
			</View>
		</Animated.View>)
	);
}

const WarningStyle = StyleSheet.create({
	wrapper: {
		...$$.border,
		...$$.flexRow,
		...$$.alignItemsCenter,
		...$$.bgWarning1,
		...$$.rounded1,
		...$$.px1,
		...$$.py2,
		borderColor: $$.Const.Col.warning2,
		borderWidth: $$.Const.BorderWidth,
		borderLeftWidth: $$.Const.BorderWidth * 15,
	},
	lSec: {
		...$$.flex1,
		borderLeftStyle: 'solid',
		borderLeftWidth: $$.Const.BorderWidth,
		borderColor: $$.Const.Col.warning2,
	}
});
export function Warning({message = [], style = {}, toastAge, animated}: ToastProp): JSX.Element | null {
	const width = Dimensions.get('window').width;
	const leftVal = useRef(new Animated.Value(animated? width : 0)).current;
	message = (typeof message === 'string')? [message] : message;

	useEffect(() => {
		if(!animated)
			return;

		Animated.spring(leftVal, {
			toValue: 0,
			friction: 5,
			tension: 80,
			useNativeDriver: true,
	    }).start(() => {
    		const outDur = toast.getOutDur();
    		setTimeout(() => {
    			Animated.timing(leftVal, {
    		      toValue: width,
    		      duration: outDur,
    			  useNativeDriver: true,
    		    }).start();
    		}, toastAge - outDur);
		});
	}, []);

	return (
		!message.length
		? null
		: (<Animated.View style={[WarningStyle.wrapper, { transform: [{translateX: leftVal}] }, style]}>
			<View style={[$$.px2]}>
				<Util.FA icon="circleExclamation" fill={$$.Const.Col.warning2}/>
			</View>
			<View style={[WarningStyle.lSec, $$.px3]}>
				{
					message.map((v, i) => (
						<Text key={i} style={[$$.ffLight, $$.textWarning2]}>
							{v}
						</Text>
					))
				}
			</View>
		</Animated.View>)
	);
}
