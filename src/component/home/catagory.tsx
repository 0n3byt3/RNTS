import {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadData, storeData, addCtgry, delCtgry, addAttr, delAttr, setTitleAttr} from '../feature/catagory.slice.tsx';
import $$ from '../../styles';
import {Form, Btn} from '../core';

type CatagoryItemProps = PropsWithChildren<{
	data: object,
}>;

const CatagoryAddStyle = StyleSheet.create({
	wrapper: {
		...$$.bgTheme,
		...$$.mt2,
		...$$.py2,
		...$$.px2,
		borderBottomStyle: "solid",
		borderBottomWidth: $$.Const.BorderWidth * 10,
		borderBottomColor: $$.Const.Col.secondary,
	},
});
export function CatagoryAdd() {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	function add() {
		if(!name)
			return ;

		dispatch(addCtgry({ctgryId: name}));

		dispatch(storeData());
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
				text="Add Catagory"
				onPress={add}
			/>
		</View>
	);
}

const CatagoryListStyle = StyleSheet.create({
	wrapper: {
		...$$.bgTheme,
		...$$.mt2,
		...$$.py2,
		...$$.px2,
	},
});
export function CatagoryList() {
	const ctgryState = useSelector(s => s.catagory);
	const list = ctgryState.list;
	const dispatch = useDispatch();
	console.log('list', list);


	useEffect(() => {
		dispatch(loadData());
	}, []);

	return (
		<ScrollView style={CatagoryListStyle.wrapper}>
			{
				Object.keys(list).map(v => (<CatagoryItem key={v} id={v} data={list[v]}/>))
			}
		</ScrollView>
	);
}

const CatagoryItemStyle = StyleSheet.create({
	wrapper: {
		...$$.bgInfo1,
		...$$.mt2,
		...$$.py2,
		...$$.px2,
		...$$.rounded2,
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
export function CatagoryItem({id, data} :CatagoryItemProps) {
	const dispatch = useDispatch();
	const [newAttrName, setNewAttrName] = useState("");
	const types = [
		'Text',
		'Num',
		'Date',
		'CheckBox',
	];

	function onAddAttr(type :string) {
		if(!newAttrName)
			return ;
		dispatch(addAttr({
			ctgryId: id,
			attrId: newAttrName,
			type: type.toLowerCase()
		}));
		setNewAttrName("");

		dispatch(storeData());
	}

	return (
		<View style={CatagoryItemStyle.wrapper}>
			<View style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsCenter]}>
				<Text style={[$$.fwBold, $$.textPrimary, $$.fs2]}>
					{id}
					<Text style={[$$.fstItalic, $$.fs5]}>
						{`(def title: ${data.titleAttr? data.titleAttr : 'not set'})`}
					</Text>
				</Text>
				<Btn.Act
					text='Delete Catagory'
					style={[$$.ml2]}
					onPress={() => dispatch(delCtgry({ctgryId: id}))}
				/>
			</View>
			<View style={[$$.mt4]}>
				{
					Object.keys(data.attr).map(v => {
						return (
							<View key={v} style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsCenter, $$.mb2]}>
								<Text style={[$$.w50, $$.p2, $$.border, $$.rounded2]}>{v}</Text>
								<Text>{data.attr[v].type}</Text>
								<Btn.Act
									text='Delete'
									style={[$$.ml2]}
									onPress={() => dispatch(delAttr({ctgryId: id, attrId: v}))}
								/>
								<Btn.Act
									text='Set Title'
									style={[$$.ml2]}
									onPress={() => dispatch(setTitleAttr({ctgryId: id, attrId: v}))}
								/>
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
								text={`Add ${v} Field`}
								onPress={() => onAddAttr(v)}
							/>
						))
					}
				</View>
			</View>
		</View>
	);
}
