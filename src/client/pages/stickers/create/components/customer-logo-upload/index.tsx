import {type ChangeEvent, type FC, useRef} from 'react';

import './style.scss';

export type CustomerLogoProps = {
    logoFile?: File | null;
    onLogoChange: (file: File | null) => void;
};

export const CustomerLogoUpload: FC<CustomerLogoProps> = ({ logoFile, onLogoChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onLogoChange(file);
    };

    const logoSrc = logoFile
        ? URL.createObjectURL(logoFile)
        : '/customers-images/kangaroo.jpeg';

    return (
        <div className="customer-logo-wrapper" onClick={openFilePicker}>
            <img
                className="customer-logo"
                src={logoSrc}
                alt="Customer logo"
            />

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="visually-hidden"
                onChange={onFileChange}
            />
        </div>
    )
}
