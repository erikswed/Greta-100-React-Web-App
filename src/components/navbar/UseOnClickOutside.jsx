import { useEffect } from 'react';

export default function useOnClickOutside(ref, handler, exclude) {
	useEffect(() => {
		const listener = event => {
			// Do nothing if clicking ref's element or descendent elements
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			// do not react on "exclude". Typically the exclude also react so we don't want want double reaction
			if (event.target.className === exclude) {
				return;
			}
			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		document.addEventListener('scroll', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
			document.removeEventListener('scroll', listener);
		};
	}, [ref, handler, exclude]);
}
