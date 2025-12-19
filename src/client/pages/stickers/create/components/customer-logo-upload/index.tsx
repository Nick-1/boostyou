import { type ChangeEvent, type FC, useRef } from 'react';

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

    const hasLogo = Boolean(logoFile);
    const logoSrc = hasLogo ? URL.createObjectURL(logoFile!) : null;

    return (
        <div
            className={`customer-logo-wrapper ${!hasLogo ? 'customer-logo-wrapper--empty' : ''}`}
            onClick={openFilePicker}
            role="button"
            aria-label="Upload logo"
        >
            {hasLogo ? (
                <img
                    className="customer-logo"
                    src={logoSrc!}
                    alt="Customer logo"
                />
            ) : (
                <div className="customer-logo-placeholder">
                    Upload your logo
                </div>
            )}

            <input
                form="sticker-form"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="visually-hidden"
                onChange={onFileChange}
                required
            />
        </div>
    );
};
