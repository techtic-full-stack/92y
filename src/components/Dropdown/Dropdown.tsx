import { FC, useCallback, useState } from 'react';
import { DropdownSelect } from './style';
import { DropDownArrow } from '../icons/drop-down-arrow';
const { Option } = DropdownSelect;

interface OptionData {
    id: any;
    name: string;
}

export interface DropdownProps {
    onChange: (boolean: any) => void;
    placeholder: string;
    options?: OptionData[];
    defaultValue?: {
        id: any;
        name: string;
    };
    selected?: any;
}

const Dropdown: FC<DropdownProps> = ({ onChange, placeholder, options, defaultValue, selected }) => {
    const [value, setvalue] = useState<any>(selected);
    const [arrow, setArrow] = useState(false);
    const handleChange = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (value) => {
            setvalue(value);
            onChange(value);
        },
        [onChange],
    );
    return (
        <DropdownSelect
            style={{ minWidth: 106 }}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onDropdownVisibleChange={() => setArrow(!arrow)}
            className={arrow ? 'downarrow' : ''}
            suffixIcon={<DropDownArrow />}
        >
            {defaultValue && <Option value={defaultValue.id}>{defaultValue.name}</Option>}
            {options &&
                options.map((opt) => (
                    <Option value={opt.id} key={opt.name + '_' + opt.id} title="">
                        {opt.name}
                    </Option>
                ))}
        </DropdownSelect>
    );
};

export default Dropdown;
