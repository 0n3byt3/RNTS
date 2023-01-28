import type {PropsWithChildren} from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import {addMachine, delMachine, setMachineAttr} from '../feature/catagory.slice.tsx';
import $$ from '../../styles';
import {Form, Btn, Util} from '../core';
import {dispatchAndStore} from './catagory.tsx';

type MachineListProps = PropsWithChildren<{
	list: [object],
}>;
type MachineItemProps = PropsWithChildren<{
	data: object,
}>;
type DatePickerModalProps = PropsWithChildren<{
	date: object,
	setDate: (date: number) => void
}>;

const MachineViewStyle = StyleSheet.create({
	wrapper: {
		...$$.bgSecondary2,
		...$$.flex1,
		padding: 5,
	},
});
export function MachineView({route}): JSX.Element {
	const {ctgryId} = route.params;
	const dispatch = useDispatch();
	const ctgry = useSelector(s => s.catagory.list).filter(v => (v.id === ctgryId))[0];

	if(!ctgry)//edge cases in dev fastrefresh
		return ;

	return (
		<View style={[MachineViewStyle.wrapper]}>
			<Btn.Primary
				style={[$$.w100, $$.mxAuto, {maxWidth: 480}]}
				text="Add Machine"
				onPress={() => dispatchAndStore(dispatch, addMachine, {ctgryId})}
			/>
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
export function MachineList({ctgry, list = []} :MachineListProps): JSX.Element {
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
export function MachineItem({ctgry, data} :MachineItemProps): JSX.Element {
	const attr = ctgry.attr;
	const dispatch = useDispatch();

	function setAttr(attrId :string, value :any) {
		dispatchAndStore(dispatch, setMachineAttr, {
			ctgryId: ctgry.id,
			machineId: data.id,
			attrId,
			attrVal: value,
		});
	}

	return (
		<View style={MachineItemStyle.wrapper}>
			<View style={[$$.flexRow, $$.justifyContentBetween, $$.alignItemsCenter]}>
				<Text style={[$$.textAlignLeft, $$.fs3, $$.fwBold, $$.textPrimary]}>
					{data.attr[ctgry.titleAttr]? data.attr[ctgry.titleAttr] : '(No Title)'}
				</Text>
				<Btn.Act
					text='Delete'
					style={[$$.ml2]}
					onPress={() => dispatchAndStore(dispatch, delMachine, {ctgryId: ctgry.id, machineId: data.id})}
				/>
			</View>
			<View style={[$$.mt1]}>
			{
				attr.map(v => {
					if(v.type === 'text')
						return (
							<View key={v.id} style={[$$.flex, $$.justifyContentStart, $$.mt3]}>
								<Text style={[$$.textAlignLeft, $$.pl1]}>
									{v.name}
								</Text>
								<Form.Input
									onChangeText={val => setAttr(v.id, val)}
									value={data.attr[v.name]}
								/>
							</View>
						);
					else if(v.type === 'num')
						return (
							<View key={v.id} style={[$$.flex, $$.justifyContentStart, $$.mt3]}>
								<Text style={[$$.textAlignLeft, $$.pl1]}>
									{v.name}
								</Text>
								<Form.Input
									style={[]}
									onChangeText={val => setAttr(v.id, val)}
									value={data.attr[v.name]}
									keyboardType="number-pad"
								/>
							</View>
						);
					else if(v.type === 'checkbox')
						return (
							<View key={v.id} style={[$$.flex, $$.alignItemsStart, $$.mt3]}>
								<Text style={[$$.textAlignLeft, $$.pl1]}>
									{v.name}
								</Text>
								<Switch
									trackColor={{false: $$.Const.Col.darker, true: $$.Const.Col.primaryShadow}}
									thumbColor={data.attr[v]? $$.Const.Col.primary : $$.Const.Col.secondary}
									onValueChange={val => setAttr(v.id, val)}
									value={data.attr[v.name]}
								/>
							</View>
						);
					else if(v.type === 'date')
						return (
							<View key={v.id} style={[$$.flex, $$.alignItemsStart, $$.mt3]}>
								<Text style={[$$.textAlignLeft, $$.pl1]}>
									{v.name}
								</Text>
							   <DatePickerModal date={data.attr[v.name]} setDate={val => setAttr(v.id, val)}/>
							</View>
						);
				})
			}
			</View>
		</View>
	);
}

function DatePickerModal({date, setDate = f=>f}:DatePickerModalProps): JSX.Element {
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
