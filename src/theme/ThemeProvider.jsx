import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import allThemes from './index';

const ThemeContext = createContext({});
const lastThemeIndex = allThemes.length - 1;
const ThemeContextProvider = props => {
	const [theme, setTheme] = useState(allThemes[0].theme);
	const [themeName, setThemeName] = useState(allThemes[0].name);

	useEffect(() => {
		const yourTheme = localStorage.getItem('theme');
		if (yourTheme) {
			const themeIndex = allThemes.findIndex(t => t.name === yourTheme);
			if (themeIndex === -1) {
				// if someone change localstorage theme name then load default
				setTheme(allThemes[0].theme);
				setThemeName(allThemes[0].name);
			} else {
				const selectedTheme = allThemes[themeIndex];
				setTheme(selectedTheme.theme);
				setThemeName(selectedTheme.name);
			}
		} else {
			// if someone delete localstorage theme name then load default
			setTheme(allThemes[0].theme);
			setThemeName(allThemes[0].name);
		}
	}, [theme]);

	const setThemeType = () => {
		const themeIndex = allThemes.findIndex(t => t.name === themeName);
		const nextTheme = allThemes[themeIndex === lastThemeIndex ? 0 : themeIndex + 1];
		setTheme({ ...nextTheme.theme });
		setThemeName(nextTheme.name);
		persistThemeType(nextTheme.name);
	};

	function persistThemeType(name) {
		localStorage.setItem('theme', name);
	}

	return (
		<ThemeContext.Provider
			value={{
				themeName,
				setThemeType,
			}}
		>
			<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
export { ThemeContextProvider };
