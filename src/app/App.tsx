import React, { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage } from '@/pages/login'
import { MessengerPage } from '@/pages/messenger'

import { GuestRoute } from './router/GuestRoute'
import { ProtectedRoute } from './router/ProtectedRoute'
import { ROUTES } from './router/routes'

export const App: FC = () => {
	return (
		<Routes>
			<Route element={<GuestRoute />}>
				<Route path={ROUTES.login} element={<LoginPage />} />
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route
					path={`${ROUTES.messenger}/:chatId?`}
					element={<MessengerPage />}
				/>
				<Route path='/' element={<Navigate to={ROUTES.messenger} replace />} />
			</Route>

			<Route path='*' element={<Navigate to={ROUTES.messenger} replace />} />
		</Routes>
	)
}
