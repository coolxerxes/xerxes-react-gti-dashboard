import { useCallback, useState } from 'react';

export default function useOpenController(initialState: Boolean) {
	const [isOpen, setOpenState] = useState<Boolean>(initialState);

	const toggle = useCallback(() => {
		setOpenState((state) => !state);
	}, [setOpenState]);

	return { isOpen, toggle };
}
