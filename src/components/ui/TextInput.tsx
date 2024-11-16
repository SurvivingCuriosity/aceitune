
export interface TextInputProps {
    label?: string;
    value: string;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

export const TextInput = (props: TextInputProps) => {
    const { label, value, placeholder, disabled, onChange } = props;

    return (
        <span className="flex flex-col gap-1">
            {label !== "" && <label>{label}</label>}
            <input
                className="rounded-md border border-none border-neutral-700 p-2 text-black outline-none disabled:bg-neutral-500"
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            />
        </span>
    )
}
