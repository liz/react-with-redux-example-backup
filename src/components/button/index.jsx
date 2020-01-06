import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { darken } from 'polished';

import theme from '../../theme';

const ColoredButton = styled.button`
    & {
    	color: ${(props) => (props.colorAlt ? props.colorAlt : theme.white)};
        min-width: ${(props) => props.minWidth};
        background-color: ${(props) => props.color};
        cursor: pointer;
        font-weight: bold;
        border: 1px solid ${(props) => props.color};

        &:hover {
            background-image: ${(props) =>
                `radial-gradient(circle, transparent 1%, ${darken(0.2, props.color)} 1%)`};
            background-color: ${(props) => darken(0.2, props.color)};
        }

        &:active {
            background-color: ${(props) => darken(0.1, props.color)};
        }

        &.btn--border {
            background: ${(props) => (props.colorAlt ? props.colorAlt : 'transparent')};
            color: ${(props) => props.color};
            border: 2px solid ${(props) => props.color};
        }

        &.disabled,
        &:disabled {
            background: ${theme.alto};
            border-color: ${theme.alto};
            color: ${theme.black};
            font-weight: normal;

            &:hover,
            &:active {
                background: ${theme.alto};
                border-color: ${theme.alto};
                color: ${theme.black};
            }

            &.disabled--clickable:hover {
                background-image: radial-gradient(
                    circle,
                    transparent 1%,
                    ${darken(0.2, `${theme.alto}`)} 1%
                );
                background-color: ${darken(0.2, `${theme.alto}`)};
                border-color: ${darken(0.2, `${theme.alto}`)};
            }

            &.disabled--clickable:active {
                background-color: ${darken(0.1, `${theme.alto}`)};
                border-color: ${darken(0.2, `${theme.alto}`)};
            }
        }
    }

    &.btn--link {
        background: transparent;
        color: ${(props) => props.color};
        min-width: 0;

        &:hover,
        &:focus,
        &:active {
            background: transparent;
            box-shadow: none;
            color: ${(props) => darken(0.2, props.color)};
            transition: none;
        }
    }
`;

const Content = styled.span`
    display: flex;
    align-items: stretch;
    justify-content: center;
`;

const Icon = styled.span`
    display: flex;
    align-items: center;
    order: ${(props) => (props.iconOnRight ? '2' : '0')};
    padding-right: ${(props) => (props.iconOnRight ? '0' : '5px')};
    padding-left: ${(props) => (props.iconOnRight ? '5px' : '0')};
`;
Icon.displayName = 'Icon';

const Text = styled.span`
    display: flex;
    align-items: center;
    padding-left: ${(props) => (props.iconOnRight ? '5px' : '0')};
	padding-right: ${(props) => (props.iconOnRight ? '0' : '5px')};
`;
Text.displayName = 'Text';

export const Button = (props) => {
    const handleClick = (event) => {
        if (props.handleClick) {
            event.preventDefault();
            props.handleClick(event);
        }
        return false;
    };

    const renderTitleOrText = () => {
        if (props.title) {
            return props.title;
        }
        if (props.buttonText) {
            return props.buttonText;
        }
        return null;
    };

    const renderIcon = () => {
        if (props.icon) {
            return <Icon iconOnRight={props.iconOnRight}>{props.icon}</Icon>;
        }
        return null;
    };

    const renderText = () => {
        if (props.buttonText) {
            return <Text iconOnRight={props.iconOnRight}>{props.buttonText}</Text>;
        }
        return null;
    };

    return (
        <ColoredButton
            color={props.color}
            colorAlt={props.colorAlt}
            iconOnRight={props.iconOnRight}
            onClick={handleClick}
            className={props.className}
            title={renderTitleOrText()}
            type={props.type}
            aria-label={renderTitleOrText()}
            disabled={props.disabled}
            hidden={props.hidden}
            minWidth={props.minWidth}
        >
            <Content>
                {renderIcon()}
                {renderText()}
            </Content>
        </ColoredButton>
    );
};

Button.defaultProps = {
    color: theme.primaryColor,
    colorAlt: null,
    iconOnRight: false,
    type: 'button',
    className: 'btn',
    disabled: false,
    hidden: false,
    minWidth: theme.buttonMinWidth
};

Button.propTypes = {
    /** A CSS color code. */
    color: PropTypes.string,
    /** A secondary CSS color code. */
    colorAlt: PropTypes.string,
    /** Button text. */
    buttonText: PropTypes.node,
    /** Icon HTML. Typically include a font-awesome icon. Can also be an image. */
    icon: PropTypes.node,
    /** Make button icon appear on right of button text insted of left of button text. */
    iconOnRight: PropTypes.bool,
    /** Class name. */
    className: PropTypes.string,
    /** Button type */
    type: PropTypes.string,
    /** Is the button disabled? */
    disabled: PropTypes.bool,
    /** Is the button hidden? */
    hidden: PropTypes.bool,
    /** On click */
    handleClick: PropTypes.func,
    /** Should the button be smaller then the defeault min-width? */
    smallButton: PropTypes.bool
};