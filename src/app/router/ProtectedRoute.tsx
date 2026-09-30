import React, { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/features/auth/model/useAuth'

import { ROUTES } from './routes'

export const ProtectedRoute: FC = () => {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.login} replace />
	}

	return <Outlet />
}
