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
import {ToastContainer} from './src/component/toast';
import store from './src/component/home/store'
import {Home} from './src/component/home/home';

function App(): JSX.Element {

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Home/>
				<ToastContainer />
			</NavigationContainer>
		</Provider>
	);
}

export default App;
