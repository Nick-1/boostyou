import { type ChangeEvent, type FC, useMemo, useRef } from 'react';
import './style.scss';

export type CustomerLogoProps = {
    logoUrl?: string | null;
    logoFile?: File | null;
    onLogoChange: (file: File | null) => void;
};

export const CustomerLogoUpload: FC<CustomerLogoProps> = ({ logoUrl, logoFile, onLogoChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFilePicker = () => fileInputRef.current?.click();

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onLogoChange(file);
    };

    const previewSrc = useMemo(() => {
        if (logoFile) return URL.createObjectURL(logoFile);
        return logoUrl ?? null;
    }, [logoFile, logoUrl]);

    const hasLogo = Boolean(previewSrc);
    const isRequired = !logoUrl && !logoFile;

    return (
        <div
            className={`customer-logo-wrapper ${!hasLogo ? 'customer-logo-wrapper--empty' : ''}`}
            onClick={openFilePicker}
            role="button"
            aria-label="Upload logo"
        >
            {hasLogo ? (
                <img className="customer-logo" src={previewSrc!} alt="Customer logo" />
            ) : (
                <div className="customer-logo-placeholder">Upload your logo</div>
            )}

            <input
                form="sticker-form"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="visually-hidden"
                onChange={onFileChange}
                required={isRequired}
            />
        </div>
    );
};
