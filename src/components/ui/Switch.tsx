
interface SwitchProps {
    isOn: boolean;
    onToggle: () => void;
}

export const Switch = (props: SwitchProps) => {
    const { isOn, onToggle } = props;
    return (
        <div
            className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${
                isOn ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={onToggle}
        >
            <div
                className={`bg-white size-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    isOn ? "translate-x-5" : "translate-x-0"
                }`}
            />
        </div>
    );
};
