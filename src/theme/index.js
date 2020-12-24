import { createMuiTheme } from '@material-ui/core/styles';
import shadows from './shadows';
import typography from './typography';

const Caregiver = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#a84632',
			main: '#f16548',
			light: '#f3836c',
		},
		action: {
			active: '#f16548',
		},
	},
	typography,
	shadows,
	overrides: {
		MuiButtonBase: {
			text: {
				color: 'blue', // Some CSS
			},
		},
	},
});

const Creator = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#ac6613',
			main: '#f7921c',
			light: '#f8a749',
		},
		action: {
			active: '#f7921c',
		},
	},
	typography,
	shadows,
});

const Explorer = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#5a5b20',
			main: '#81822e',
			light: '#9a9b57',
		},
		action: {
			active: '#81822e',
		},
	},
	typography,
	shadows,
});

const Hero = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#004877',
			main: '#0067ab',
			light: '#3385bb',
		},
		action: {
			active: '#0067ab',
		},
	},
	typography,
});

const Innocent = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#007a9a',
			main: '#00afdd',
			light: '#33bfe3',
		},
		action: {
			active: '#00afdd',
		},
	},
	typography,
	shadows,
});

const Jester = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#738f27',
			main: '#a5cd39',
			light: '#b7d760',
		},
		action: {
			active: '#a5cd39',
		},
	},
	typography,
	shadows,
});

const Lover = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#971f48',
			main: '#d92d68',
			light: '#e05786',
		},
		action: {
			active: '#d92d68',
		},
	},
	typography,
	shadows,
});

const Magician = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#651a63',
			main: '#91268e',
			light: '#a751a4',
		},
		action: {
			active: '#91268e',
		},
	},
	typography,
	shadows,
});

const Everyperson = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#006369',
			main: '#008e97',
			light: '#33a4ab',
		},
		action: {
			active: '#008e97',
		},
	},
	typography,
	shadows,
});

const Revolutionary = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#8f1b27',
			main: '#cd2738',
			light: '#d7525f',
		},
		action: {
			active: '#cd2738',
		},
	},
	typography,
	shadows,
});

const Ruler = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#a18005',
			main: '#e7b708',
			light: '#ebc539',
		},
		action: {
			active: '#e7b708',
		},
	},
	typography,
	shadows,
});

const Sage = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			dark: '#5a331e',
			main: '#81492c',
			light: '#9a6d56',
		},
		action: {
			active: '#81492c',
		},
	},
	typography,
	shadows,
});

const allThemes = [
	{ name: 'Sage', theme: Sage },
	{ name: 'Hero', theme: Hero },
	{ name: 'Explorer', theme: Explorer },
	{ name: 'Caregiver', theme: Caregiver },
	{ name: 'Creator', theme: Creator },
	{ name: 'Innocent', theme: Innocent },
	{ name: 'Jester', theme: Jester },
	{ name: 'Lover', theme: Lover },
	{ name: 'Magician', theme: Magician },
	{ name: 'Everyperson', theme: Everyperson },
	{ name: 'Revolutionary', theme: Revolutionary },
	{ name: 'Ruler', theme: Ruler },
];

export default allThemes;
