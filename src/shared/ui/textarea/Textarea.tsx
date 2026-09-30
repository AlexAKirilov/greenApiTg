import cn from 'classnames'
import React, { FC } from 'react'

import styles from './Textarea.module.css'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea: FC<TextareaProps> = (props) => {
	const { className, ...rest } = props

	return <textarea className={cn(styles.textarea, className)} {...rest} />
}
