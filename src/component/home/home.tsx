import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import $$ from '../../styles';
import {Form, Btn} from '../core';
import {CatagoryAdd, CatagoryList} from './catagory.tsx';
import {MachineView} from './machine.tsx';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator
		initialRouteName="Dashboard"
		drawerContent={(props) => <CustomDrawer {...props} />}
	>
      <Drawer.Screen name="Dashboard" component={DashboardView} />
      <Drawer.Screen name="Catagory" component={MachineView}
		  options={{
		    drawerItemStyle: { display: "none" }
		  }}
	  />
    </Drawer.Navigator>
  );
}

const DashboardViewStyle = StyleSheet.create({
	wrapper: {
		flex: 1,
		padding: 5,
	},
});
function DashboardView(): JSX.Element {
	return (
		<ScrollView contentContainerStyle={[DashboardViewStyle.wrapper]}>
			<CatagoryAdd/>
			<View>
				<CatagoryList/>
			</View>
		</ScrollView>
	);
}

function CustomDrawer(props): JSX.Element {
	const list = useSelector(s => s.catagory.list);
	const navigation = props.navigation;

	return (
		<DrawerContentScrollView {...props}>
		  	<DrawerItemList {...props} />
			{
				Object.keys(list).map(v => (
					<DrawerItem
						key={v}
						label={v}
						onPress={() => navigation.navigate('Catagory', {ctgryId: v})}
					/>
				))
			}
		</DrawerContentScrollView>
	);
}
