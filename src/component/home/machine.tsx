import type {PropsWithChildren} from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addMachine, delMachine, setMachineAttr} from '../feature/catagory.slice.tsx';
import $$ from '../../styles';
import {Form, Btn} from '../core';

type MachineListProps = PropsWithChildren<{
	list: [object],
}>;
type MachineItemProps = PropsWithChildren<{
	data: object,
}>;

const MachineViewStyle = StyleSheet.create({
	wrapper: {
		padding: 5,
	},
});
export function MachineView({route}): JSX.Element {
	const {ctgryId} = route.params;
	const dispatch = useDispatch();
	const ctgry = useSelector(s => s.catagory.list)[ctgryId];

	if(!ctgry)//edge cases in dev fastrefresh
		return ;

	return (
		<View style={[MachineViewStyle.wrapper]}>
			<Btn.Primary
				text="Add Machine"
				onPress={() => dispatch(addMachine({ctgryId}))}
			/>
			<MachineList ctgryId={ctgryId} list={ctgry.machine}/>
		</View>
	);
}

const MachineListStyle = StyleSheet.create({
	wrapper: {
		...$$.bgTheme,
		...$$.mt2,
		...$$.py2,
		...$$.px2,
		...$$.rounded2,
		borderRightStyle: "solid",
		borderRightWidth: $$.Const.BorderWidth * 10,
	},
});
export function MachineList({ctgryId, list = []} :MachineListProps): JSX.Element {

	return (
		<View>
		{
			list.map(v => (<MachineItem ctgryId={ctgryId} key={v.id} id={v.id} data={v}/>))
		}
		</View>
	);
}

const MachineItemStyle = StyleSheet.create({
	wrapper: {
		...$$.bgTheme,
		...$$.mt2,
		...$$.py2,
		...$$.px2,
		...$$.rounded2,
		borderStyle: "solid",
		borderWidth: $$.Const.BorderWidth * 5,
		borderColor: $$.Const.Col.primary,
	},
});
export function MachineItem({ctgryId, id={v}, data} :MachineItemProps) {
	const ctgry = useSelector(s => s.catagory.list)[ctgryId];
	const attr = ctgry.attr;
	const dispatch = useDispatch();

	function setAttr(attrId :string, value :any) {
		dispatch(setMachineAttr({
			ctgryId,
			machineId: id,
			attrId,
			attrVal: value,
		}));
	}

	return (
		<View style={MachineItemStyle.wrapper}>
			<View style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsCenter]}>
				<Text style={[$$.textAlignLeft, $$.fs3, $$.fwBold]}>
					{data.attr[ctgry.titleAttr]? data.attr[ctgry.titleAttr] : '(No Title)'}
				</Text>
				<Btn.Act
					text='Delete Machine'
					style={[$$.ml2]}
					onPress={() => dispatch(delMachine({ctgryId, machineId: data.id}))}
				/>
			</View>
			<View style={[$$.mt1]}>
			{
				Object.keys(attr).map(v => {
					if(attr[v].type === 'text')
						return (
							<View key={v} style={[$$.flex, $$.justifyContentStart, $$.mt3]}>
								<Text style={[$$.textAlignLeft, $$.pl1]}>
									{v}
								</Text>
								<Form.Input
									style={[]}
									onChangeText={val => setAttr(v, val)}
									value={data.attr[v]}
								/>
							</View>
						);
					else if(attr[v].type === 'num')
						return (
							<View key={v} style={[$$.flex, $$.justifyContentStart, $$.mt3]}>
								<Text style={[$$.textAlignLeft, $$.pl1]}>
									{v}
								</Text>
								<Form.Input
									style={[]}
									onChangeText={val => setAttr(v, val)}
									value={data.attr[v]}
									keyboardType="number-pad"
								/>
							</View>
						);
					else if(attr[v].type === 'checkbox')
						return (
							<View key={v} style={[$$.flex, $$.alignItemsStart, $$.mt3]}>
								<Text style={[$$.textAlignLeft, $$.pl1]}>
									{v}
								</Text>
								<Switch
									trackColor={{false: $$.Const.Col.darker, true: $$.Const.Col.primaryShadow}}
									thumbColor={data.attr[v]? $$.Const.Col.primary : $$.Const.Col.secondary}
									onValueChange={val => setAttr(v, val)}
									value={data.attr[v]}
								/>
							</View>
						);
				})
			}
			</View>
		</View>
	);
}
