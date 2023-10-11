import { Meta, Story } from '@storybook/react';
import Dropdown, { DropdownProps } from './Dropdown';

export default {
    component: Dropdown,
    title: 'Dropdown',
} as Meta;

const options = [
    { id: 1, name: 'Class 1' },
    { id: 2, name: 'Class 2' },
    { id: 3, name: 'class 3' },
];

const Template: Story<DropdownProps> = (props) => <Dropdown {...props} />;

export const dropdown = Template.bind({});
dropdown.args = {
    selected: 0,
    onChange: () => {},
    options: options,
    placeholder: 'Select a category',
    defaultValue: { id: 0, name: 'Class Type' },
};
