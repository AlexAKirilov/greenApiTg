import React, { FC, FormEvent, useState } from 'react'

import {
	normalizeGreenApiUrl,
	type GreenApiCredentials,
} from '@/entities/credentials'
import { DEFAULT_API_URL } from '@/shared/config/constants'
import { Button, Field, FormError, Input } from '@/shared/ui'

import styles from './AuthForm.module.css'

export interface AuthFormProps {
	onSubmit: (credentials: GreenApiCredentials) => void
}

export const AuthForm: FC<AuthFormProps> = (props) => {
	const { onSubmit } = props

	const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL)
	const [idInstance, setIdInstance] = useState('')
	const [apiTokenInstance, setApiTokenInstance] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		setError('')

		if (!idInstance.trim() || !apiTokenInstance.trim()) {
			setError('Заполните idInstance и apiTokenInstance')
			return
		}

		const safeApiUrl = normalizeGreenApiUrl(apiUrl)

		setLoading(true)
		onSubmit({
			apiUrl: safeApiUrl,
			idInstance: idInstance.trim(),
			apiTokenInstance: apiTokenInstance.trim(),
		})
		setLoading(false)
	}

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className={styles.title}>Telegram Chat</h1>
				<p className={styles.subtitle}>Войдите с учётными данными GREEN-API</p>

				{error && <FormError>{error}</FormError>}

				<Field label='API URL' htmlFor='apiUrl'>
					<Input
						id='apiUrl'
						type='url'
						value={apiUrl}
						onChange={(e) => setApiUrl(e.target.value)}
						placeholder={DEFAULT_API_URL}
					/>
				</Field>

				<Field label='idInstance' htmlFor='idInstance'>
					<Input
						id='idInstance'
						type='text'
						value={idInstance}
						onChange={(e) => setIdInstance(e.target.value)}
						placeholder='1100000000'
						autoComplete='off'
					/>
				</Field>

				<Field label='apiTokenInstance' htmlFor='apiTokenInstance'>
					<Input
						id='apiTokenInstance'
						type='password'
						value={apiTokenInstance}
						onChange={(e) => setApiTokenInstance(e.target.value)}
						placeholder='••••••••••••••••'
						autoComplete='off'
					/>
				</Field>

				<Button type='submit' fullWidth disabled={loading}>
					Войти
				</Button>

				<p className={styles.hint}>
					Данные можно получить в{' '}
					<a
						href='https://console.green-api.com/'
						target='_blank'
						rel='noreferrer'
					>
						личном кабинете GREEN-API
					</a>
				</p>
			</form>
		</div>
	)
}
