import cn from 'classnames'
import React, { FC } from 'react'

import styles from './Input.module.css'

type InputSize = 'default' | 'compact'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	inputSize?: InputSize
}

export const Input: FC<InputProps> = (props) => {
	const { inputSize = 'default', className, ...rest } = props

	return (
		<input
			className={cn(
				styles.input,
				inputSize === 'compact' && styles.compact,
				className
			)}
			{...rest}
		/>
	)
}
