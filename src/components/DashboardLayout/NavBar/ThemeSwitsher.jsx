import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ThemeContext from '../../../theme/ThemeProvider';

export default function ThemeSwitcherComponent() {
	const { setThemeType, themeName } = useContext(ThemeContext);

	const handleSwitch = () => {
		setThemeType();
	};

	return (
		<>
			<FormControlLabel
				labelPlacement="bottom"
				label={themeName}
				control={<Switch disabled={false} onChange={handleSwitch} />}
			/>
		</>
	);
}
