import type {RootState, AppDispatch} from './store';
import type {Catagory} from '../feature/catagory.slice';
import type {PropsWithChildren} from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData, addCtgry, editCtgry, delCtgry, addAttr, delAttr, setTitleAttr} from '../feature/catagory.slice';
import {useAppSelector, useAppDispatch} from './hooks';
import $$ from '../../styles';
import {Form, Btn, Util} from '../core';
import {toast} from '../toast';

export function dispatchAndStore(dispatch: AppDispatch, action: (pl: any) => any, payload: object = {}) {
	dispatch(action(payload));
	dispatch(storeData());
}

interface CatagoryItemProps {
	data: Catagory;
}

const CatagoryViewStyle = StyleSheet.create({
	wrapper: {
		...$$.bgSecondary2,
		...$$.flex1,
		padding: 5,
	},
});
export function CatagoryView(): JSX.Element {
	return (
		<ScrollView contentContainerStyle={[CatagoryViewStyle.wrapper]}>
			<CatagoryAdd/>
			<View style={[$$.flex1]}>
				<CatagoryList/>
			</View>
		</ScrollView>
	);
}

const CatagoryAddStyle = StyleSheet.create({
	wrapper: {
		...$$.bgSecondary2,
		...$$.pt2,
		...$$.pb4,
		...$$.px2,
		...$$.mxAuto,
		...$$.w100,
		maxWidth: 480,
		borderBottomStyle: "solid",
		borderBottomWidth: $$.Const.BorderWidth * 5,
		borderBottomColor: $$.Const.Col.secondary,
	},
});
export function CatagoryAdd(): JSX.Element {
	const list = useAppSelector(s => s.catagory.list);
	const dispatch = useAppDispatch();
	const [name, setName] = useState("");

	function onAdd() {
		const err = [];

		if(!name) {
			err.push("Catagory Name Can't be Empty!");
		} else if(list.filter((v: Catagory) => (v.name.toLowerCase() === name.toLowerCase())).length) {
			err.push("Duplicate Catagory Name!");
		}

		if(err.length) {
			toast.err(err);
			return;
		}

		dispatchAndStore(dispatch, addCtgry, {name});
		setName("");
	}

	return (
		<View style={CatagoryAddStyle.wrapper}>
			<Form.Input
				style={[]}
				placeholder="Catagory Name"
				onChangeText={setName}
        		value={name}
			/>
			<Btn.Primary
				style={[$$.mt2]}
				icon='plus'
				text="Add Catagory"
				onPress={onAdd}
			/>
		</View>
	);
}

const CatagoryListStyle = StyleSheet.create({
	wrapper: {
		...$$.bgSecondary2,
		...$$.flexWrap,
		...$$.flexRow,
		...$$.mt2,
		...$$.pt2,
		...$$.pb4,
		...$$.px2,
	},
});
export function CatagoryList() {
	const list: Catagory[] = useAppSelector(s => s.catagory.list);

	if(!list.length)
		return (
			<Util.NoItemMsg/>
		);

	return (
		<View style={[$$.flex1]}>
			<ScrollView contentContainerStyle={CatagoryListStyle.wrapper}>
			{
				list.map((v: Catagory) => (<CatagoryItem key={v.id} data={v}/>))
			}
			</ScrollView>
		</View>
	);
}

const CatagoryItemStyle = StyleSheet.create({
	wrapper: {
		...$$.bgTheme,
		...$$.mt2,
		...$$.mr3,
		...$$.py2,
		...$$.px2,
		...$$.rounded2,
		...$$.w100,
		maxWidth: 480,
		borderStyle: "solid",
		borderWidth: $$.Const.BorderWidth * 5,
		borderColor: $$.Const.Col.primary,
	},
	footer: {
		...$$.flex1,
		...$$.mt3,
		...$$.pt3,
		borderTopStyle: "solid",
		borderTopWidth: $$.Const.BorderWidth * 5,
		borderTopColor: $$.Const.Col.secondary,
	},
});
export function CatagoryItem({data} :CatagoryItemProps) {
	const list: Catagory[] = useAppSelector(s => s.catagory.list);
	const dispatch = useAppDispatch();
	const [newAttrName, setNewAttrName] = useState("");
	const [ctgryName, setCtgryName] = useState(data.name);

	const types = [
		'Text',
		'Num',
		'Date',
		'CheckBox',
	];

	function onSetCtgryName() {
		const err = [];

		if(!ctgryName) {
			err.push("Catagory Name Can't be Empty!");
		} else if(list.filter((v: Catagory) => (v.name.toLowerCase() === ctgryName.toLowerCase())).length) {
			err.push("Duplicate Catagory Name!");
		}

		if(err.length) {
			toast.err(err);
			return setCtgryName(data.name);
		}

		dispatchAndStore(dispatch, editCtgry, {
			id: data.id,
			name: ctgryName,
		});

	}
	function onAddAttr(type :string) {
		const err = [];
		let defVal: any;
		type = type.toLowerCase();

		if(!newAttrName) {
			err.push("Field Name Can't be Empty!");
		} else if(data.attr.filter(v => (v.name.toLowerCase() === newAttrName.toLowerCase())).length) {
			err.push("Duplicate Field Name!");
		}

		if(err.length) {
			toast.err(err);
			return ;
		}

		if(type === 'text')
			defVal = 'no text';
		else if(type === 'num')
			defVal = '1';
		else if(type === 'date')
			defVal = new Date().getTime();
		else if(type === 'checkbox')
			defVal = false;

		dispatchAndStore(dispatch, addAttr, {
			ctgryId: data.id,
			name: newAttrName,
			type: type.toLowerCase(),
			defVal,
		});
		setNewAttrName("");
	}

	return (
		<View style={CatagoryItemStyle.wrapper}>
			<View style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsStart]}>
				<View style={[]}>
					<Form.Input
						placeholder="Catagory Name"
						style={[$$.p1, $$.textPrimary, $$.fwBold,  $$.fs3, $$.rounded1]}
						onChangeText={setCtgryName}
						value={ctgryName}
						onEndEditing={onSetCtgryName}
					/>
					<View style={[$$.mt2, $$.flexRow, $$.justifyContentStart, $$.alignItemsStart]}>
						<Text style={[$$.textSecondary, $$.fs5]}>Title Field:</Text>
						{
							data.titleAttr?
								(<Text style={[$$.ml1, $$.textThemeReverse, $$.fwBold]}>{data.titleAttr}</Text>)
							:
								(<Text style={[$$.ml1, $$.fstItalic, $$.textSecondary, $$.fs5]}>[not set]</Text>)
						}
					</View>
				</View>
				<Btn.Act
					icon="trashCan"
					iconFill={$$.Const.Col.danger2}
					style={[$$.ml2]}
					onPress={() => dispatchAndStore(dispatch, delCtgry, {id: data.id})}
				/>
			</View>
			<View style={[$$.mt4]}>
				{
					data.attr.map(v => {
						return (
							<View key={v.id} style={[$$.flex, $$.mb4]}>
								<View style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsCenter]}>
									<Text style={[$$.textThemeReverse]}>{`${v.type} field`.toUpperCase()}</Text>
									<View style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsCenter, $$.mb2]}>
										<Btn.Act
											text='Set Title'
											icon='text'
											style={[$$.ml2]}
											onPress={() => dispatchAndStore(dispatch, setTitleAttr, {ctgryId: data.id, attrId: v.id})}
										/>
										<Btn.Act
											icon="trashCan"
											style={[$$.ml2]}
											onPress={() => dispatchAndStore(dispatch, delAttr, {ctgryId: data.id, attrId: v.id})}
										/>
									</View>
								</View>
								<Text style={[$$.p2, $$.bgThemerReverse, $$.rounded2, $$.textThemeReverse]}>
									{v.name}
								</Text>
							</View>
						);
					})
				}
			</View>
			<View style={CatagoryItemStyle.footer}>
				<Form.Input
					placeholder="Field Name"
					onChangeText={setNewAttrName}
					value={newAttrName}
				/>
				<View style={[$$.flexRow, $$.flexWrap, $$.justifyContentStart, $$.mt3]}>
					{
						types.map(v => (
							<Btn.Secondary
								key={v}
								style={[$$.m1]}
								text={`${v} Field`}
								icon="plus"
								onPress={() => onAddAttr(v)}
							/>
						))
					}
				</View>
			</View>
		</View>
	);
}
