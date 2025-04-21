interface AmenityCheckboxProps {
    id: string;
    label: string;
    name: string;
    defaultChecked?: boolean;
}

export const AmenityCheckbox = ({ id, label, name, defaultChecked }: AmenityCheckboxProps) => {
    return (
        <div className="flex items-center space-x-2 mb-2">
            <input
                type="checkbox"
                id={id}
                name={name}
                value={id}
                defaultChecked={defaultChecked}
                className="h-4 w-4 text-red-600 border-gray-400 rounded focus:ring-2 focus:ring-red-500"
            />
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
        </div>
    );
};
