import React, { useRef } from 'react'

import type { GreenApiCredentials } from '@/entities/credentials'
import { loginSession } from '@/features/auth/model/authSession'

export function withAuthCredentials(credentials: GreenApiCredentials) {
	return function AuthCredentialsDecorator(Story: React.ComponentType) {
		const seededRef = useRef(false)

		if (!seededRef.current) {
			loginSession(credentials)
			seededRef.current = true
		}

		return <Story />
	}
}
