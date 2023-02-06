import type {DrawerContentComponentProps, DrawerScreenProps} from '@react-navigation/drawer';
import type {Catagory} from '../feature/catagory.slice';
import {useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {useAppSelector, useAppDispatch} from './hooks';
import $$ from '../../styles';
import {Form, Btn, Util} from '../core';
import {loadData} from '../feature/catagory.slice';
import {CatagoryView} from './catagory';
import {MachineView, MachineList} from './machine';

type DrawerParams = {
	Dashboard: undefined;
	Machine: {
		ctgryId: number;
		ctgryName: string;
	};
	ManageCatagory: undefined;
};
export type MachineViewProps = DrawerScreenProps<DrawerParams, 'Machine'>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParams {}
  }
}

const Drawer = createDrawerNavigator<DrawerParams>();

export function Home() {
	return (
		<Drawer.Navigator
			initialRouteName="Dashboard"
			drawerContent={(props) => <CustomDrawer {...props} />}
			screenOptions={{
				drawerActiveTintColor: $$.Const.Col.primary,
				drawerLabelStyle: {
					...$$.textThemeReverse,
				},
				headerStyle: {
					...$$.bgTheme,
				},
				headerTintColor: $$.Const.Col.primary,
				headerTitleStyle: {
					...$$.textThemeReverse,
					...$$.ffLight,
				},
				drawerStyle: {
					...$$.bgTheme,
				},
			}}
		>
			<Drawer.Screen name="Dashboard" component={DashboardView} />
			<Drawer.Screen name="ManageCatagory" component={CatagoryView}
				options={{
					title: "Manage Catagory",
				}}
			/>
			<Drawer.Screen name="Machine" component={MachineView}
				options={({route}) => ({
					title: route.params? `${route.params.ctgryName} List` : '',
					drawerItemStyle: { display: "none" }
				})}
			/>
		</Drawer.Navigator>
	);
}

const DashboardViewStyle = StyleSheet.create({
	wrapper: {
		...$$.bgSecondary2,
		...$$.flexWrap,
		...$$.flexRow,
		padding: 5,
	},
	ctgryLabel: {
		...$$.bgTheme,
		...$$.textAlignLeft,
		...$$.fs2,
		...$$.fwBold,
		...$$.textPrimary,
		...$$.p2,
		...$$.px3,
		...$$.rounded1,
		...$$.border,
		borderStyle: 'solid',
		borderColor: $$.Const.Col.primary,
	},
});
function DashboardView(): JSX.Element {
	const list = useAppSelector(s => s.catagory.list);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadData());
	}, []);

	if(!list.length)
		return (
			<Util.NoItemMsg/>
		);

	return (
		<ScrollView style={[$$.bgSecondary2]} contentContainerStyle={[DashboardViewStyle.wrapper]}>
		{
			list.map((v: Catagory) => {
				return (
					<View key={v.id} style={[$$.bgSecondary2, $$.p1]}>
						<Text style={[DashboardViewStyle.ctgryLabel, {maxWidth: 480}]}>{v.name}</Text>
						<MachineList ctgry={v} list={v.machine}/>
					</View>
				);
			})
		}
		</ScrollView>
	);
}

function CustomDrawer(props: DrawerContentComponentProps): JSX.Element {
	const list = useAppSelector(s => s.catagory.list);
	const routes = useNavigationState(s => s?.routes);
	const activeIndex = useNavigationState(s => s?.index);
	let activeCtgry = -1;
	if(routes && routes[activeIndex].name === 'Machine')
		activeCtgry = routes[activeIndex].params? (routes[activeIndex].params as {ctgryId: number}).ctgryId : activeCtgry;

	return (
		<DrawerContentScrollView {...props}>
		  	<DrawerItemList {...props} />
			{!!list.length &&
				<View style={[$$.bgSecondary, $$.w100, $$.my2, {height: 2}]}>
				</View>
			}
			{
				list.map((v: Catagory) => (
					<DrawerItem
						key={v.id}
						label={v.name}
						onPress={() => props.navigation.navigate('Machine', {ctgryId: v.id, ctgryName: v.name})}
						focused={activeCtgry === v.id}
						activeTintColor={$$.Const.Col.primary}
						inactiveTintColor={$$.Const.Col.themeReverse}
					/>
				))
			}
		</DrawerContentScrollView>
	);
}
