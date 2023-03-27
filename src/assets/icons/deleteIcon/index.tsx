interface Props {
	height?: number | string;
	width?: number | string;
	className?: string;
}

const DeleteIcon: React.FC<Props> = (props) => {
	const { height = 21, width = 21, className = '' } = props;

	return (
		<svg
			className={className}
			id='Group_39022'
			data-name='Group 39022'
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 21.999 24'
		>
			<path
				id='Path_4118'
				data-name='Path 4118'
				d='M10,17V29.251A2.748,2.748,0,0,0,12.749,32h12.5A2.749,2.749,0,0,0,28,29.251V17Zm6,10a1,1,0,1,1-2,0V21a1,1,0,1,1,2,0Zm4,0a1,1,0,1,1-2,0V21a1,1,0,1,1,2,0Zm4,0a1,1,0,1,1-2,0V21a1,1,0,0,1,2,0v6ZM16,10h6v1h2V10a2.006,2.006,0,0,0-2-2H16a2.006,2.006,0,0,0-2,2v1h2Z'
				transform='translate(-8.001 -8)'
				fill='#fe646f'
			/>
			<path
				id='Path_4119'
				data-name='Path 4119'
				d='M30.666,12.75v2.5a.756.756,0,0,1-.75.75H9.417a.756.756,0,0,1-.75-.75v-2.5A2.748,2.748,0,0,1,11.416,10h16.5A2.748,2.748,0,0,1,30.666,12.75Z'
				transform='translate(-8.667 -7)'
				fill='#fe646f'
				opacity='0.5'
			/>
		</svg>
	);
};

export default DeleteIcon;
