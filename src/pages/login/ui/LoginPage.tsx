import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import type { GreenApiCredentials } from '@/entities/credentials'
import { AuthForm } from '@/features/auth'
import { useAuth } from '@/features/auth/model/useAuth'

export const LoginPage: FC = () => {
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleLogin = async (credentials: GreenApiCredentials) => {
		await login(credentials)
		navigate(ROUTES.messenger, { replace: true })
	}

	return <AuthForm onSubmit={handleLogin} />
}
