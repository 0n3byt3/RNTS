import type {PropsWithChildren} from 'react';
import type {Catagory, Machine} from '../feature/catagory.slice';
import type {MachineViewProps} from './home';
import {useEffect, useState, useCallback} from 'react';
import {ScrollView, View, Text, StyleSheet, Switch} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {addMachine, delMachine, setMachineAttr} from '../feature/catagory.slice';
import {useAppSelector, useAppDispatch} from './hooks';
import $$ from '../../styles';
import {Form, Btn, Util} from '../core';
import {dispatchAndStore} from './catagory';

interface MachineListProps {
	list: Machine[];
	ctgry: Catagory;
}
interface MachineItemProps {
	data: Machine;
	ctgry: Catagory;
}
interface MachineItemAttrProps {
	ctgryId: number;
	attrId: number;
	attrType: 'text' | 'num' | 'date' | 'checkbox';
	attrVal: any;
	machineId: number;
}
interface DatePickerModalProps {
	date: number;
	setDate: (date: number) => void;
}

const MachineViewStyle = StyleSheet.create({
	wrapper: {
		...$$.bgSecondary2,
		...$$.flex1,
		padding: 5,
	},
});
export function MachineView({route}: MachineViewProps): JSX.Element | null {
	const {ctgryId} = route.params;
	const dispatch = useAppDispatch();
	const ctgry = useAppSelector(s => s.catagory.list).filter((v: Catagory) => (v.id === ctgryId))[0];

	if(!ctgry)//edge cases in dev fastrefresh
		return null;

	return (
		<View style={[MachineViewStyle.wrapper]}>
			<Btn.Primary
				style={[$$.w100, $$.mxAuto, $$.my2, {maxWidth: 480}]}
				text="Add Machine"
				icon='plus'
				onPress={() => dispatchAndStore(dispatch, addMachine, {ctgryId})}
			/>
			<View style={[$$.bgSecondary, $$.w100, $$.my2, {height: 2}]}>
			</View>
			<MachineList ctgry={ctgry} list={ctgry.machine}/>
		</View>
	);
}

const MachineListStyle = StyleSheet.create({
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
export function MachineList({ctgry, list = []}: MachineListProps): JSX.Element {
	if(!list.length)
		return (
			<Util.NoItemMsg/>
		);

	return (
		<View style={[$$.flex1]}>
			<ScrollView contentContainerStyle={MachineListStyle.wrapper}>
			{
				list.map(v => (<MachineItem key={v.id} ctgry={ctgry} data={v}/>))
			}
			</ScrollView>
		</View>
	);
}

const MachineItemStyle = StyleSheet.create({
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
});
export function MachineItem({ctgry, data}: MachineItemProps): JSX.Element {
	const attr = ctgry.attr;
	const dispatch = useAppDispatch();

	return (
		<View style={MachineItemStyle.wrapper}>
			<View style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsCenter]}>
				<Text style={[$$.textAlignLeft, $$.fs3, $$.fwBold, $$.textPrimary]}>
					{data.attr[ctgry.titleAttr]? data.attr[ctgry.titleAttr] : '(No Title)'}
				</Text>
				<Btn.Act
					icon="trashCan"
					style={[$$.ml2]}
					onPress={() => dispatchAndStore(dispatch, delMachine, {ctgryId: ctgry.id, machineId: data.id})}
				/>
			</View>
			<View style={[$$.mt1, $$.px1]}>
			{
				attr.map(v => (
					<View key={v.id} style={[$$.flex, $$.alignItemsStart, $$.mt3]}>
						<Text style={[$$.textAlignLeft, $$.pl1, $$.textThemeReverse]}>
							{v.name}
						</Text>
						<MachineItemAttr
							ctgryId={ctgry.id}
							attrId={v.id}
							attrType={v.type}
							attrVal={data.attr[v.name]}
							machineId={data.id}
						/>
					</View>
				))
			}
			</View>
		</View>
	);
}

function MachineItemAttr({ctgryId, attrId, attrType, attrVal, machineId}: MachineItemAttrProps): JSX.Element | null {
	const dispatch = useAppDispatch();

	const setAttr = useCallback((value: any) => {
		dispatchAndStore(dispatch, setMachineAttr, {
			ctgryId,
			attrId,
			machineId,
			attrVal: value,
		});
	}, [ctgryId, attrId, machineId]);

	if(attrType === 'text')
		return (
			<Form.Input
				style={[$$.w100]}
				onChangeText={setAttr}
				value={attrVal}
			/>
		);
	else if(attrType === 'num')
		return (
			<Form.Input
				style={[$$.w100]}
				onChangeText={setAttr}
				value={attrVal}
				keyboardType="number-pad"
			/>
		);
	else if(attrType === 'checkbox')
		return (
			<Switch
				trackColor={{false: $$.Const.Col.darker, true: $$.Const.Col.primaryShadow}}
				thumbColor={attrVal? $$.Const.Col.primary : $$.Const.Col.secondary}
				onValueChange={setAttr}
				value={attrVal}
			/>
		);
	else if(attrType === 'date')
		return (
			<DatePickerModal date={attrVal} setDate={setAttr}/>
		);
	else
		return null;
}

function DatePickerModal({date, setDate = f=>f}: DatePickerModalProps): JSX.Element {
  	const [open, setOpen] = useState(false);

	return (
		<>
			<Btn.Tertiary text={new Date(date).toLocaleString('en-GB',{hour12: false})} onPress={() => setOpen(true)} />
			<DatePicker
				modal
				open={open}
				date={new Date(date)}
				onConfirm={(date) => {
					setOpen(false);
					setDate(date.getTime());
				}}
				onCancel={() => setOpen(false)}
			/>
	   </>
	);
}
