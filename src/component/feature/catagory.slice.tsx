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
		list: [],
		counterId: 1,
	},
	reducers: {
		addCtgry: (state, act) => {
			const d = act.payload;
			state.list.push({
				id: state.counterId++,
				name: d.name,
				attr: [],
				titleAttr: undefined,
				machine: [],
			});
		},
		editCtgry: (state, act) => {
			const d = act.payload;
			const ctgry = state.list.filter(v => (v.id === d.id))[0];
			ctgry.name = d.name;
		},
		delCtgry: (state, act) => {
			const d = act.payload;
			state.list = state.list.filter(v => (v.id !== d.id));
		},

		addAttr: (state, act) => {
			const d = act.payload;
			const ctgry = state.list.filter(v => (v.id === d.ctgryId))[0];
			if(ctgry.attr.filter(v => (v.name === d.name)).length)
				return ;//duplicate attr
			ctgry.attr.push({
				id: state.counterId++,
				name: d.name,
				type: d.type,
			});
			ctgry.machine.forEach(machine => {
				if(d.type === 'text')
					machine.attr[d.name] = 'textField';
				else if(d.type === 'num')
					machine.attr[d.name] = '1';
				else if(d.type === 'date')
					machine.attr[d.name] = new Date().getTime();
				else if(d.type === 'checkbox')
					machine.attr[d.name] = false;
				else
					machine.attr[d.name] = undefined;
			});
		},
		delAttr: (state, act) => {
			const d = act.payload;
			const ctgry = state.list.filter(v => (v.id === d.ctgryId))[0];
			const attr = ctgry.attr.filter(v => (v.id === d.attrId))[0];
			if(!attr)
				return ;
			ctgry.machine.forEach(v => {
				if(v.attr[d.attr.name])
					delete v.attr[d.attr.name];
			})
			ctgry.attr = ctgry.attr.filter(v => (v.id !== d.attrId));
		},
		setTitleAttr: (state, act) => {
			const d = act.payload;
			const ctgry = state.list.filter(v => (v.id === d.ctgryId))[0];
			const attr = ctgry.attr.filter(v => (v.id === d.attrId))[0];
			ctgry.titleAttr = attr.name;
		},

		//machine
		addMachine: (state, act) => {
			const d = act.payload;
			const ctgry = state.list.filter(v => (v.id === d.ctgryId))[0];
			const machine = {
				id: state.counterId++,
				attr: {},
			};
			ctgry.attr.forEach(v => {
				if(v.type === 'text')
					machine.attr[v.name] = 'textField';
				else if(v.type === 'num')
					machine.attr[v.name] = "1";
				else if(v.type === 'date')
					machine.attr[v.name] = new Date().getTime();
				else if(v.type === 'checkbox')
					machine.attr[v.name] = false;
				else
					machine.attr[v.name] = undefined;
			});
			ctgry.machine.push(machine);
		},
		delMachine: (state, act) => {
			const d = act.payload;
			const ctgry = state.list.filter(v => (v.id === d.ctgryId))[0];
			ctgry.machine = ctgry.machine.filter(v => (v.id !== d.machineId));
		},
		setMachineAttr: (state, act) => {
			const d = act.payload;
			const ctgry = state.list.filter(v => (v.id === d.ctgryId))[0];
			const attr = ctgry.attr.filter(v => (v.id === d.attrId))[0];
			const machine = ctgry.machine.filter(v => (v.id === d.machineId))[0];

			if(machine)
				machine.attr[attr.name] = d.attrVal;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadData.fulfilled, (state, act) => {
		 	state.counterId = act.payload.counterId || 1;
		 	state.list = act.payload.list || [];
		})
	},
});

export const {setStateData, addCtgry, editCtgry, delCtgry, addAttr, delAttr, setTitleAttr, addMachine, delMachine, setMachineAttr} = catagorySlice.actions;

export default catagorySlice.reducer;
