import React, { FC } from 'react'

import styles from './IconButton.module.css'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}

export const IconButton: FC<IconButtonProps> = (props) => {
	const { children, type = 'button', ...rest } = props

	return (
		<button type={type} className={styles.button} {...rest}>
			{children}
		</button>
	)
}
