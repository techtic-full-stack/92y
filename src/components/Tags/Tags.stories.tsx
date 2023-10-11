import React from 'react';
import { Story, Meta } from '@storybook/react';
import { TagProps, TagType } from './types';
import Tags from './index';

export default {
    component: Tags,
    title: 'Tags',
    argTypes: {
        variant: {
            defaultValue: TagType.theArts,
            options: TagType,
            control: { type: 'select' },
        },
    },
} as Meta;

const BDTemplate: Story<TagProps> = (props: TagProps) => <Tags {...props} />;

export const TagTemplate = BDTemplate.bind({});
TagTemplate.args = { label: 'tag' };
