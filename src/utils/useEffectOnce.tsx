import { useEffect, useRef } from 'react';

export const useEffectOnce = (
	effect: () => any | (() => any),
	dep: any = []
) => {
	const destroyFunc = useRef<any | (() => any)>();
	const calledOnce = useRef(false);
	const renderAfterCalled = useRef(false);

	if (calledOnce.current) {
		renderAfterCalled.current = true;
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}

		calledOnce.current = true;
		destroyFunc.current = effect();

		return () => {
			if (!renderAfterCalled.current) {
				return;
			}

			if (destroyFunc.current) {
				destroyFunc.current();
			}
		};
	}, dep);
};
