import {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadData, storeData, addCtgry, editCtgry, delCtgry, addAttr, delAttr, setTitleAttr} from '../feature/catagory.slice.tsx';
import $$ from '../../styles';
import {Form, Btn, Util} from '../core';

export function dispatchAndStore(dispatch :object, action :object, payload: object = {}) {
	dispatch(action(payload));
	dispatch(storeData());
}

type CatagoryItemProps = PropsWithChildren<{
	data: object,
}>;

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
		...$$.mt2,
		...$$.py2,
		...$$.px2,
		...$$.mxAuto,
		...$$.w100,
		maxWidth: 480,
		borderBottomStyle: "solid",
		borderBottomWidth: $$.Const.BorderWidth * 10,
		borderBottomColor: $$.Const.Col.secondary,
	},
});
export function CatagoryAdd(): JSX.Element {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	function add() {
		if(!name)
			return ;

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
				text="Add Catagory"
				onPress={add}
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
	const list = useSelector(s => s.catagory.list);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadData());
	}, []);

	if(!list.length)
		return (
			<Util.NoItemMsg/>
		);

	return (
		<View style={[$$.flex1]}>
			<ScrollView contentContainerStyle={CatagoryListStyle.wrapper}>
			{
				list.map(v => (<CatagoryItem key={v.id} data={v}/>))
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
	const dispatch = useDispatch();
	const [newAttrName, setNewAttrName] = useState("");
	const types = [
		'Text',
		'Num',
		'Date',
		'CheckBox',
	];

	function onSetCtgryName(name :string) {
		if(!name)
			return ;
		dispatchAndStore(dispatch, editCtgry, {
			id: data.id,
			name: name,
		});
	}
	function onAddAttr(type :string) {
		if(!newAttrName)
			return ;
		dispatchAndStore(dispatch, addAttr, {
			ctgryId: data.id,
			name: newAttrName,
			type: type.toLowerCase()
		});
		setNewAttrName("");
	}

	return (
		<View style={CatagoryItemStyle.wrapper}>
			<View style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsCenter]}>
				<Form.Input
					placeholder="Catagory Name"
					style={[$$.p1, $$.textPrimary, $$.fwBold,  $$.fs3, $$.rounded1]}
					onChangeText={onSetCtgryName}
					value={data.name}
				/>
				<Btn.Act
					text='Delete Catagory'
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
									<Text>{`${v.type} field`.toUpperCase()}</Text>
									<View style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsCenter, $$.mb2]}>
										<Btn.Act
											text='Delete'
											style={[$$.ml2]}
											onPress={() => dispatchAndStore(dispatch, delAttr, {ctgryId: data.id, attrId: v.id})}
										/>
										<Btn.Act
											text='Set Title'
											style={[$$.ml2]}
											onPress={() => dispatchAndStore(dispatch, setTitleAttr, {ctgryId: data.id, attrId: v.id})}
										/>
									</View>
								</View>
								<Text style={[$$.p2, $$.bgThemerReverse, $$.rounded2]}>
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
