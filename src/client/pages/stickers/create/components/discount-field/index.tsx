import { TextField, InputAdornment, type TextFieldProps } from '@mui/material';

export type DiscountFieldProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
    value: number | '';
    onChange: (value: number | '') => void;
};

export function DiscountField({
                                  value,
                                  onChange,
                                  ...rest
                              }: DiscountFieldProps) {
    const isValid = value === '' || (value >= 1 && value <= 100);

    return (
        <TextField
            {...rest}
    label={rest.label ?? 'Discount'}
    value={value}
    error={!isValid}
    helperText={
    !isValid ? 'Discount must be between 1 and 100' : rest.helperText
}
    inputProps={{
        inputMode: 'numeric',
            pattern: '[0-9]*',
            min: 1,
            max: 100,
    }}
    InputProps={{
    ...rest.InputProps,
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
    }}
    onChange={(e) => {
        const raw = e.target.value;

        // дозволяємо очистити поле
        if (raw === '') {
            onChange('');
            return;
        }

        // тільки цифри
        if (!/^\d+$/.test(raw)) return;

        const num = Number(raw);

        // жорсткий контроль діапазону
        if (num < 1 || num > 100) return;

        onChange(num);
    }}
    />
);
}
