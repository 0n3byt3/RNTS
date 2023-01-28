import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import $$ from '../../styles';
import {Form, Btn, Util} from '../core';
import {CatagoryView} from './catagory.tsx';
import {MachineView, MachineList} from './machine.tsx';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator
		initialRouteName="Dashboard"
		drawerContent={(props) => <CustomDrawer {...props} />}
	>
      <Drawer.Screen name="Dashboard" component={DashboardView} />
      <Drawer.Screen name="ManageCatagory" component={CatagoryView} />
      <Drawer.Screen name="Machine" component={MachineView}
		  options={({ route }) => ({
			  title: route.params.ctgryName + ' List',
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
		...$$.bgPrimaryReverse,
		...$$.textAlignLeft,
		...$$.fs2,
		...$$.fwBold,
		...$$.textPrimary,
		...$$.p2,
		...$$.rounded3,
	},
});
function DashboardView(): JSX.Element {
	const list = useSelector(s => s.catagory.list);

	if(!list.length)
		return (
			<Util.NoItemMsg/>
		);

	return (
		<ScrollView contentContainerStyle={[DashboardViewStyle.wrapper]}>
		{
			list.map(v => {
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

function CustomDrawer(props): JSX.Element {
	const list = useSelector(s => s.catagory.list);
	const navigation = props.navigation;
	const navState = navigation.getState();
	const activeIndex = navState.index;
	let activeCtgry = undefined;
	if(navState.routeNames[activeIndex] === 'Machine')
		activeCtgry =  navState.routes[activeIndex].params.ctgryId;

	return (
		<DrawerContentScrollView {...props}>
		  	<DrawerItemList {...props} />
			{
				list.map(v => (
					<DrawerItem
						key={v.id}
						label={v.name}
						onPress={() => navigation.navigate('Machine', {ctgryId: v.id, ctgryName: v.name})}
						focused={activeCtgry === v.id}
					/>
				))
			}
		</DrawerContentScrollView>
	);
}
