import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = createAsyncThunk(
	'catagory/storeData',
	(arg, thunkAPI) => {
		const ctgryState = thunkAPI.getState().catagory;
		let d = JSON.stringify(ctgryState);
		return  AsyncStorage.setItem("ctgryData", d).catch(err => {
			console.error(err);
		});
	}
);
const loadData = createAsyncThunk(
	'catagory/loadData',
	(arg, thunkAPI) => {
		return AsyncStorage.getItem("ctgryData").then(storedData => {
			storedData = (storedData != null)? JSON.parse(storedData) : {};
				console.log('load', storedData);
			return storedData;
		}).catch(err => {
			console.error(err);
		});
	}
);
export {storeData, loadData};

export const catagorySlice = createSlice({
	name: 'catagory',
	initialState: {
		list: {},
		counterId: 1,
	},
	reducers: {
		addCtgry: (state, act) => {
			const d = act.payload;
			state.list[d.ctgryId] = {
				attr: {},
				titleAttr: undefined,
				machine: [],
			};
		},
		delCtgry: (state, act) => {
			const d = act.payload;
			if(state.list[d.ctgryId])
		  		delete state.list[d.ctgryId];
		},

		addAttr: (state, act) => {
			const d = act.payload;
			const ctgry = state.list[d.ctgryId];
			if(state.list[d.ctgryId].attr[d.attrId])
				return ;//duplicate attr
			state.list[d.ctgryId].attr[d.attrId] = {
				type: d.type,
			};
			ctgry.machine.forEach(machine => {
				if(d.type === 'text')
					machine.attr[d.attrId] = 'def text';
				else if(d.type === 'num')
					machine.attr[d.attrId] = 1;
				else if(d.type === 'date')
					machine.attr[d.attrId] = new Date().getTime();
				else if(d.type === 'checkbox')
					machine.attr[d.attrId] = false;
				else
					machine.attr[d.attrId] = undefined;
			});
		},
		delAttr: (state, act) => {
			const d = act.payload;
			state.list[d.ctgryId].machine.forEach(v => {
				if(v.attr[d.attrId])
					delete v.attr[d.attrId];
			})
			if(state.list[d.ctgryId].attr[d.attrId])
		  		delete state.list[d.ctgryId].attr[d.attrId];
		},
		setTitleAttr: (state, act) => {
			const d = act.payload;
			state.list[d.ctgryId].titleAttr = d.attrId;
		},

		//machine
		addMachine: (state, act) => {
			const d = act.payload;
			const ctgry = state.list[d.ctgryId];
			const machine = {
				id: state.counterId,
				attr: {},
			};
			Object.keys(ctgry.attr).forEach(v => {
				if(ctgry.attr[v].type === 'text')
					machine.attr[v] = 'def text';
				else if(ctgry.attr[v].type === 'num')
					machine.attr[v] = "1";
				else if(ctgry.attr[v].type === 'date')
					machine.attr[v] = new Date().getTime();
				else if(ctgry.attr[v].type === 'checkbox')
					machine.attr[v] = false;
				else
					machine.attr[v] = undefined;
			});
			state.list[d.ctgryId].machine = [...state.list[d.ctgryId].machine, machine];

			state.counterId++;
		},
		delMachine: (state, act) => {
			const d = act.payload;
			const ctgry = state.list[d.ctgryId];
			state.list[d.ctgryId].machine = [...ctgry.machine.filter(v => (v.id !== d.machineId))];
		},
		setMachineAttr: (state, act) => {
			const d = act.payload;
			const ctgry = state.list[d.ctgryId];
			const machine = ctgry.machine.filter(v => (v.id === d.machineId))[0];

			if(machine)
				machine.attr[d.attrId] = d.attrVal;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadData.fulfilled, (state, act) => {
			console.log('fulfilled', state, act);
		 	state = act.payload;
		})
	},
});

export const {setStateData, addCtgry, delCtgry, addAttr, delAttr, setTitleAttr, addMachine, delMachine, setMachineAttr} = catagorySlice.actions;

export default catagorySlice.reducer;
