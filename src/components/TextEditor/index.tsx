import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { type Props } from './types';

const TextEditor: React.FC<Props> = ({ value, onChange }) => {
	return (
		<ReactQuill
			style={{ height: 180 }}
			theme='snow'
			value={value}
			onChange={onChange}
		/>
	);
};

export default TextEditor;
