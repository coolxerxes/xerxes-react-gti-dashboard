import { toast } from 'react-toastify';

export const copyToClipboard = (
	text: string,
	withNotification = false
): boolean => {
	try {
		const dummy = document.createElement('textarea');
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		if (withNotification) {
			toast.success('Copied to clipboard');
		}
		return true;
	} catch {
		toast.error(`Couldn't copy to clipboard. Please copy text manually`);
		return false;
	}
};
