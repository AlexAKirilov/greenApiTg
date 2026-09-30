import cn from 'classnames'
import React, { FC } from 'react'

import styles from './Button.module.css'

type ButtonVariant = 'primary'
type ButtonSize = 'default' | 'compact' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
	fullWidth?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
	const {
		variant = 'primary',
		size = 'default',
		fullWidth = false,
		className,
		type = 'button',
		children,
		...rest
	} = props

	return (
		<button
			type={type}
			className={cn(
				styles.button,
				styles[variant],
				size === 'compact' && styles.compact,
				size === 'icon' && styles.icon,
				fullWidth && styles.fullWidth,
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
