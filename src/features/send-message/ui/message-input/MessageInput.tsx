import React, { FC, FormEvent, KeyboardEvent, useState } from 'react'

import { MAX_MESSAGE_LENGTH } from '@/shared/config/constants'
import { Button, FormError, Textarea } from '@/shared/ui'

import styles from './MessageInput.module.css'

export interface MessageInputProps {
	onSend: (text: string) => Promise<void>
	disabled?: boolean
}

export const MessageInput: FC<MessageInputProps> = (props) => {
	const { onSend, disabled } = props

	const [text, setText] = useState('')
	const [sending, setSending] = useState(false)
	const [error, setError] = useState('')

	const handleSend = async () => {
		const trimmed = text.trim()
		if (!trimmed || sending || disabled) {
			return
		}

		if (trimmed.length > MAX_MESSAGE_LENGTH) {
			setError(`Сообщение не должно превышать ${MAX_MESSAGE_LENGTH} символов`)
			return
		}

		setSending(true)
		setError('')

		try {
			await onSend(trimmed)
			setText('')
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Не удалось отправить сообщение'
			)
		} finally {
			setSending(false)
		}
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		handleSend()
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			handleSend()
		}
	}

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<div className={styles.wrapper}>
				{error && <FormError placement='overlay'>{error}</FormError>}
				<Textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder='Сообщение...'
					rows={1}
					disabled={disabled || sending}
					maxLength={MAX_MESSAGE_LENGTH}
				/>
			</div>
			<Button
				type='submit'
				size='icon'
				disabled={!text.trim() || sending || disabled}
				title='Отправить'
			>
				➤
			</Button>
		</form>
	)
}
