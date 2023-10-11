import { Menu, Row } from 'antd';
import styled from 'styled-components';
import theme from '../../theme';
import { toRem } from '../utils';
import { Logo } from '../icons/logo';

type HeaderRowProp = {
    scroll?: number;
};
export const PageHeader = styled.div`
    position: sticky;
    z-index: 11;
    top: 0;
    background: ${(props: any) => props.color || theme.navy.primary};
    color: ${theme.white};
    text-align: center;
`;

export const HeaderRow = styled(Row)<HeaderRowProp>`
    padding: ${toRem(15)} 0 ${toRem(12)} 0;
    border-bottom: 1px solid ${theme.white};
    .text-start {
        float: left;
    }
    .mobile-menu {
        display: none !important;
    }
    @media (max-width: 1057px) {
        .desktop-menu {
            display: none !important;
        }
        .mobile-menu {
            display: block !important;
        }
    }
    .menu-col {
        float: right;
        width: 100%;
        .hamburger-react {
            position: absolute !important;
            right: -${toRem(10)};
        }
    }
    &:after {
        content: '';
        display: block;
        clear: both;
    }
`;

export const NavMenu = styled(Menu)`
    &.ant-menu-vertical {
        border-right: none !important;
        .right-arrow {
            display: block !important;
        }
        width: 100% !important;
        display: inline-grid;
        justify-content: flex-start;
        li {
            span {
                a {
                    display: inline-flex;
                    color: inherit;
                }
            }
        }
        @media (max-width: 1057px) {
            display: block !important;
        }
    }
    &.ant-menu-vertical.ant-menu-sub {
        display: flex !important;
        flex-direction: column !important;
    }
    .right-arrow {
        display: none !important;
    }
    background-color: transparent;
    color: ${theme.white};
    display: flex;
    @media (max-width: 991px) {
        display: grid !important;
    }
    justify-content: flex-end;
    font-size: ${toRem(16)};
    font-family: 'roobertregular';
    line-height: ${toRem(24)};
    border-bottom: none;
    &.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected,
    &.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active,
    &.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover {
        color: ${theme.yellow.secondary} !important;
        text-decoration: none;
        .anticon {
            svg {
                circle {
                    fill: ${theme.yellow.secondary};
                }
            }
        }
    }
    &.ant-menu-vertical:not(.ant-menu-dark) > .ant-menu-item-selected,
    &.ant-menu-vertical:not(.ant-menu-dark) > .ant-menu-item-active,
    &.ant-menu-vertical:not(.ant-menu-dark) > .ant-menu-item:hover {
        background-color: inherit;
        color: ${theme.yellow.secondary} !important;
        text-decoration: none;
    }
    &.ant-menu-vertical > .ant-menu-item {
        height: ${toRem(60)};
        font-size: ${toRem(22)};
        line-height: ${toRem(26)};
        letter-spacing: -0.022em;
        font-family: 'roobertregular';
        padding: 0 !important;
        .dot-icon {
            display: none !important;
        }
        display: flex !important;
        justify-content: space-between;
        flex-direction: row-reverse;
        :last-child {
            justify-content: center;
        }
    }
    &.ant-menu-vertical > .ant-menu-submenu {
        height: ${toRem(60)};
        font-size: ${toRem(22)};
        line-height: ${toRem(26)};
        font-weight: 500;
        display: flex;
        align-items: center;
        .ant-menu-submenu-title {
            padding: 0 !important;
        }
        .down-arrow {
            top: ${toRem(15)};
        }
        .dot-icon {
            display: none !important;
        }
    }
    .ant-menu-submenu-title:hover,
    .ant-menu-submenu-title::after {
        color: ${theme.yellow.secondary} !important;
        border-bottom: none !important;
        display: flex !important;
        align-items: center !important;
    }
    .ant-menu-submenu:hover {
        color: ${theme.yellow.secondary} !important;
        .anticon {
            svg {
                circle {
                    fill: ${theme.yellow.secondary} !important;
                }
            }
        }
    }
    &.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu {
        padding-left: ${toRem(25)} !important;
    }
    .ant-menu-submenu-disabled {
        display: none;
    }
    .ant-menu-submenu {
        color: inherit !important;
        padding-right: 0 !important;
    }
    .active-dropdown {
        color: ${theme.yellow.secondary} !important;
        .anticon {
            svg {
                circle {
                    fill: ${theme.yellow.secondary};
                }
            }
        }
        .down-arrow {
            svg {
                path {
                    fill: ${theme.yellow.secondary} !important;
                }
            }
        }
    }
    &.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu::after {
        border-bottom: none !important;
    }
    .ant-menu-submenu-title {
        .ant-menu-title-content {
            opacity: 0.8 !important;
            margin-left: ${toRem(8)} !important;
        }
        display: flex !important;
        align-items: center !important;
        .anticon {
            min-width: ${toRem(8)} !important;
            margin-bottom: ${toRem(0.5)} !important;
        }
        .down-arrow {
            position: absolute;
            right: 0;
            top: ${toRem(9)};
            svg {
                path {
                    fill: ${theme.white} !important;
                }
            }
        }
    }
    .ant-menu-submenu-arrow {
        display: block;
        position: relative;
        transform: rotate(90deg);
        margin-left: ${toRem(10)};
        right: 0;
        top: -${toRem(4.5)};
        visibility: hidden;
    }
    .ant-menu-submenu:hover > .ant-menu-submenu-title {
        .down-arrow {
            svg {
                path {
                    fill: ${theme.yellow.secondary} !important;
                }
            }
        }
    }
    .ant-menu-submenu-title {
        padding: 0 !important;
    }
`;

export const NavMenuItems = styled(Menu.Item)`
    &.menu-items {
        > span {
            float: left;
            margin-left: ${toRem(8)};
            line-height: 16px;
            a {
                display: block;
                opacity: 0.8;
                color: ${theme.white};
                &:hover {
                    color: ${theme.yellow.secondary};
                }
            }
        }
        .anticon {
            margin-left: 0;
            min-width: ${toRem(8)};
            opacity: 1;
            margin-bottom: ${toRem(0.5)};
        }
        .dot-icon {
            display: block;
            line-height: 0;
            @media not all and (min-resolution: 0.001dpcm) {
                position: relative;
                top: ${toRem(2)};
            }
        }
        .Chrome-dot {
            position: relative;
            top: ${toRem(1)};
        }
    }

    padding: 0 0 0 ${toRem(25)} !important;
    display: flex !important;
    align-items: center;
    &.ant-menu-item::after,
    &.ant-menu-submenu::after {
        display: none;
    }
    &.active {
        color: ${theme.yellow.secondary};
        a {
            color: ${theme.yellow.secondary}!important;
        }
        .anticon {
            svg {
                circle {
                    fill: ${theme.yellow.secondary};
                }
            }
        }
    }
`;

export const FooterPage = styled.div`
    color: ${theme.white};
    background: ${theme.navy.primary};
    .container {
        padding-top: ${toRem(80)};
        padding-bottom: ${toRem(80)};
        .check-box {
            margin-right: ${toRem(16)};
        }
    }
`;

export const SpanText = styled.span`
    font-weight: 700;
    font-size: ${toRem(14)};
    font-family: 'roobertbold', sans-serif;
    letter-spacing: 0.1em;
    color: #fff;
    opacity: 0.5;
`;

export const ResourceList = styled.ul`
    margin-right: ${toRem(10)};
    list-style-type: none;
    padding: ${toRem(24)} 0 0 0;
    > li {
        margin-bottom: 19px;
        a {
            font-size: ${toRem(16)};
            font-family: 'Inter', sans-serif;

            text-underline-offset: 2px;
            color: ${theme.white};
            &:hover {
                color: ${theme.yellow.secondary};
            }
        }
    }
    @media (max-width: 991px) {
        padding-top: 0 !important;
    }
`;

export const SocialIconList = styled.div`
    display: flex;
    justify-content: space-between;
    width: ${toRem(132)};
    height: ${toRem(24)};
    margin-top: ${toRem(2)};
    @media (max-width: 575px) {
        width: ${toRem(232)};
        height: ${toRem(40)};
        > a {
            height: ${toRem(40)};
            width: ${toRem(40)};
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                svg {
                    height: ${toRem(33.33)};
                    width: ${toRem(33.33)};
                }
            }
        }
    }
`;

export const ChildStyle = styled.div`
    // padding-top: ${toRem(76)};
`;

export const FooterRow = styled(Row)`
    @media (max-width: 991px) {
        margin-top: ${toRem(26)} !important;
    }
    @media (max-width: 575px) {
        margin-top: 20px;
        margin-bottom: ${toRem(30)} !important;
    }
    @media (max-width: 380px) {
        display: block;
        margin-bottom: ${toRem(30)} !important;
    }
`;

export const StyledLogo = styled(Logo)`
    color: white;

    svg {
        width: ${toRem(176)};
        height: ${toRem(49)};
    }
`;
