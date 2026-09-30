import React, { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/features/auth/model/useAuth'

import { ROUTES } from './routes'

export const GuestRoute: FC = () => {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated) {
		return <Navigate to={ROUTES.messenger} replace />
	}

	return <Outlet />
}
