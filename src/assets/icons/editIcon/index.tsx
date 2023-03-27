interface Props {
	height?: number | string;
	width?: number | string;
	className?: string;
}
const EditIcon: React.FC<Props> = (props) => {
	const { height = 21, width = 21, className = '' } = props;
	return (
		<svg
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 11.993 10.343'
		>
			<g id='chevron-down' transform='translate(11.993 10.343) rotate(180)'>
				<g
					id='Group_39021'
					data-name='Group 39021'
					transform='translate(11.993 10.343) rotate(180)'
				>
					<path
						id='Path_4114'
						data-name='Path 4114'
						d='M7.3,1.043H.522A.522.522,0,0,1,.522,0H7.3a.522.522,0,0,1,0,1.043Z'
						transform='translate(4.171 9.299)'
						fill='#147fc3'
						opacity='0.5'
					/>
					<path
						id='Path_4115'
						data-name='Path 4115'
						d='M3.291,1.033,2.553.3A1.067,1.067,0,0,0,1.079.3L0,1.374,2.212,3.586,3.291,2.508a1.041,1.041,0,0,0,0-1.474Z'
						transform='translate(6.756 0)'
						fill='#147fc3'
						opacity='0.5'
					/>
					<path
						id='Path_4116'
						data-name='Path 4116'
						d='M6.019,0,.645,5.374a.26.26,0,0,0-.07.124L.007,7.911a.261.261,0,0,0,.254.321A.257.257,0,0,0,.32,8.224l2.412-.569a.256.256,0,0,0,.124-.07L8.231,2.212Z'
						transform='translate(0 2.112)'
						fill='#147fc3'
					/>
				</g>
			</g>
		</svg>
	);
};

export default EditIcon;
