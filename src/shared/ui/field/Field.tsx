import React, { FC } from 'react'

import styles from './Field.module.css'

export interface FieldProps {
	label: string
	htmlFor: string
	children: React.ReactNode
}

export const Field: FC<FieldProps> = (props) => {
	const { label, htmlFor, children } = props

	return (
		<div className={styles.field}>
			<label className={styles.label} htmlFor={htmlFor}>
				{label}
			</label>
			{children}
		</div>
	)
}
