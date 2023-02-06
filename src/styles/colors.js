export default function getColors(mode = 'light') {
	let _C = {};
	//main colors
	_C.light = '#e8e5f1';
	_C.dark = '#242430';
	//theme colors
	_C.theme = (mode === 'light')? _C.light : _C.dark;
	_C.themeReverse = (mode === 'light')? _C.dark : _C.light;
	_C.darker = (mode === 'light')? '#5252521f' : 'rgba(0, 0, 0, 0.2)';
	_C.lighter = (mode === 'light')? 'rgba(255, 255, 255, 0.75)' : '#dadada1a';
	_C.themer = (mode === 'light')? _C.lighter : _C.darker;
	_C.themerReverse = (mode === 'light')? _C.darker : _C.lighter;
	_C.primary = (mode === 'light')? '#3400a6' : '#bfa4fb';
	_C.primaryReverse = (mode === 'light')? '#bfa4fb' : '#3400a6';
	_C.primaryShadow = (mode === 'light')? 'rgba(156, 13, 253, 0.25)' : 'rgba(192, 107, 250, 0.25)';
	_C.secondary = (mode === 'light')? '#828282' : '#959599';
	_C.secondary2 = (mode === 'light')? '#c7c6d7' : '#292d37';
	_C.danger1 = (mode === 'light')? '#ffc2c2' : 'rgb(134, 13, 8)';
	_C.danger2 = (mode === 'light')? '#db4646' : '#ff8181';
	_C.success1 = (mode === 'light')? '#baffa8' : '#1d860891';
	_C.success2 = (mode === 'light')? '#27cd38' : '#81ff8a';
	_C.warning1 = (mode === 'light')? '#fcedb8' : '#86570891';
	_C.warning2 = (mode === 'light')? '#dbb246' : '#ffe781';
	_C.info1 = (mode === 'light')? '#00d1ff3b' : '#08868691';
	_C.info2 = (mode === 'light')? '#46bcdb' : '#81ecff';

	return _C;
}
