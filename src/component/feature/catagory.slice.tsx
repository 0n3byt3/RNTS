import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../home/store';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Attribute {
	id: number;
	name: string;
	type: "text" | "num" | "checkbox" | "date";
	defVal: any;
}
export interface Machine {
	id: number;
	attr: {[attrName: string] : any};
}
export interface Catagory {
	id: number;
	name: string;
	attr: Attribute[];
	titleAttr: string;
	machine: Machine[];
}
interface CatagoryState {
	list: Catagory[];
	counterId: number;
}

const storeData = createAsyncThunk<any, undefined, {state: RootState}>(
	'catagory/storeData',
	(arg, thunkAPI) => {
		const ctgryState: CatagoryState = thunkAPI.getState().catagory;
		let d: string = JSON.stringify(ctgryState);
		return  AsyncStorage.setItem("ctgryData", d).catch(err => {
			console.error(err);
		});
	}
);
const loadData = createAsyncThunk(
	'catagory/loadData',
	async (arg, {rejectWithValue}) => {
		try {
			const storedData = await AsyncStorage.getItem("ctgryData");
			const d = storedData? JSON.parse(storedData) : {
				counterId: 1,
				list: [],
			};
			return d as CatagoryState;
		} catch (err) {
			return rejectWithValue(console.error(err));
		}
	}
);

const initialState: CatagoryState = {
	list: [],
	counterId: 1,
}

export const catagorySlice = createSlice({
	name: 'catagory',
	initialState,
	reducers: {
		addCtgry: (state, act: PayloadAction<Catagory>) => {
			const d: Catagory = act.payload;
			state.list.push({
				id: state.counterId++,
				name: d.name,
				attr: [],
				titleAttr: "",
				machine: [],
			});
		},
		editCtgry: (state, act) => {
			const d = act.payload;
			const ctgry: Catagory = state.list.filter(v => (v.id === d.id))[0];
			ctgry.name = d.name;
		},
		delCtgry: (state, act) => {
			const d = act.payload;
			state.list = state.list.filter(v => (v.id !== d.id));
		},

		addAttr: (state, act) => {
			const d = act.payload;
			const ctgry = state.list.filter(v => (v.id === d.ctgryId))[0];
			ctgry.attr.push({
				id: state.counterId++,
				name: d.name,
				type: d.type,
				defVal: d.defVal,
			});
			ctgry.machine.forEach(machine => {
				machine.attr[d.name] = d.defVal;
			});
		},
		delAttr: (state, act) => {
			const d = act.payload;
			const ctgry = state.list.filter(v => (v.id === d.ctgryId))[0];
			const attr = ctgry.attr.filter(v => (v.id === d.attrId))[0];
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
			const ctgry: Catagory = state.list.filter(v => (v.id === d.ctgryId))[0];
			const machine: Machine = {
				id: state.counterId++,
				attr: {},
			};
			ctgry.attr.forEach(v => {
				machine.attr[v.name] = v.defVal;
			});
			ctgry.machine = [...ctgry.machine, machine];
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
		builder.addCase(loadData.fulfilled, (state, {payload}) => {
		 	state.counterId = payload.counterId;
		 	state.list = payload.list;
		})
	},
});

export {storeData, loadData};
export const {addCtgry, editCtgry, delCtgry, addAttr, delAttr, setTitleAttr, addMachine, delMachine, setMachineAttr} = catagorySlice.actions;

export default catagorySlice.reducer;
