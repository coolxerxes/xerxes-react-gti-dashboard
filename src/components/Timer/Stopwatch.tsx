import React, { useMemo } from 'react';

interface Props {
	preparationTime: bigint | number | any;
	time: number | bigint | any;
}

// eslint-disable-next-line react/display-name
const Stopwatch: React.FC<Props> = React.memo(({ preparationTime, time }) => {
	const { minutes, hours, seconds } = useMemo(() => {
		const hours: any = ('0' + Math.floor(time / 3600).toString()).slice(-2);
		const minutes: any = (
			'0' + Math.floor((time - hours * 3600) / 60).toString()
		).slice(-2);
		const seconds = (
			'0' + (time - hours * 3600 - minutes * 60).toString()
		).slice(-2);

		return { minutes, hours, seconds };
	}, [time]);

	const timerColor = useMemo(() => {
		const currentTime = Math.floor(time / 60);
		if (+currentTime < +preparationTime) {
			return '#85E067';
		}
		if (
			+currentTime >= +preparationTime &&
			+currentTime < +preparationTime + 2
		) {
			return '#D5AE34';
		}

		if (+currentTime >= +preparationTime + 2) {
			return '#C02328';
		}

		return '#fff';
	}, [preparationTime, time]);

	return (
		<div
			className={`text-[32px] font-dinBold mb-[5px]`}
			style={{ color: timerColor }}
		>
			{+hours > 0 && <span>{hours}:</span>}
			<span>{minutes}:</span>
			<span>{seconds}</span>
		</div>
	);
});

Stopwatch.displayName = 'Stopwatch';

export default Stopwatch;
