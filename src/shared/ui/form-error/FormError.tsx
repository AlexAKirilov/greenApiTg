import cn from 'classnames'
import React, { FC } from 'react'

import styles from './FormError.module.css'

type FormErrorPlacement = 'block' | 'overlay'

export interface FormErrorProps {
	children: React.ReactNode
	placement?: FormErrorPlacement
	className?: string
}

export const FormError: FC<FormErrorProps> = (props) => {
	const { children, placement = 'block', className } = props

	return (
		<div
			className={cn(styles.error, styles[placement], className)}
			role='alert'
		>
			{children}
		</div>
	)
}
