import Button from 'components/Button';
import { useUploadFile } from 'hooks';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { type Props } from './types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const Upload: React.FC<Props> = ({ onChange, horizontal }) => {
	const { uploadImage } = useUploadFile();
	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const url = await uploadImage(acceptedFiles[0]);
			onChange(url as string);
		},
		[uploadImage, onChange]
	);

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	const { t, i18n } = useTranslation();

	return (
		<div
			className='bg-lightRedBackground rounded-lg flex h-full w-full justify-center items-center border-dashed border-primary border py-4'
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p className='text-base font-dinBold'>
					{t('common.uploadPlaceholder')}
				</p>
			) : (
				<div
					className={classNames({
						'py-5 px-8 flex  justify-between items-center w-full flex-col':
							true,
						'py-5': horizontal,
					})}
				>
					{horizontal ? undefined : (
						<div className='flex justify-center'>
							<AiOutlineCloudUpload
								size={50}
								style={{ color: 'rgba(255, 0, 0, 0.3)' }}
							/>
						</div>
					)}
					<p className='ant-upload-text font-dinBold'>
						{t('common.uploadPlaceholder')}
					</p>
					<p className='ant-upload-hint'> {t('common.or')}</p>
					<Button className='mt-2 w-full'>{t('common.browseFiles')}</Button>
				</div>
			)}
		</div>
	);
};

export default Upload;
