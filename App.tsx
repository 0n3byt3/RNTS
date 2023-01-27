/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import {NavigationContainer} from '@react-navigation/native';
import store from './src/component/home/store.tsx'
import {MyDrawer} from './src/component/home/home.tsx';

function App(): JSX.Element {

	return (
		<Provider store={store}>
			<NavigationContainer>
				<MyDrawer/>
			</NavigationContainer>
		</Provider>
	);
}

export default App;
