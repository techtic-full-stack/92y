import styled from 'styled-components';
import { Select } from 'antd';

export const DropdownSelect = styled(Select)`
    .ant-select-arrow {
        .anticon {
            pointer-events: inherit !important;
            display: flex;
            align-items: center;
        }
    }
    &.downarrow {
        .anticon {
            pointer-events: inherit !important;
            transform: rotateZ(-180deg);
            display: flex;
            align-items: center;
        }
    }
`;
