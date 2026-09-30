import axios, { type AxiosRequestConfig } from 'axios'

import type { GreenApiCredentials } from '@/entities/credentials'
import { DEFAULT_API_URL } from '@/shared/config/constants'

function normalizeBaseGreenApiUrl(value: string): string {
	const trimmed = (value ?? '').trim().replace(/\/+$/, '')

	if (!trimmed) {
		return DEFAULT_API_URL
	}

	try {
		const candidate = /^https?:\/\//i.test(trimmed)
			? trimmed
			: `https://${trimmed}`
		const url = new URL(candidate)
		const hostname = url.hostname.toLowerCase()

		if (
			hostname === 'green-api.com' ||
			hostname === 'api.green-api.com' ||
			hostname.endsWith('.green-api.com')
		) {
			return `https://${hostname}`
		}

		return DEFAULT_API_URL
	} catch {
		return DEFAULT_API_URL
	}
}

import type {
	DeleteNotificationResponseDto,
	ReceiveNotificationQueryDto,
	ReceiveNotificationResponseDto,
	SendMessageRequestDto,
	SendMessageResponseDto,
	SetSettingsRequestDto,
	SetSettingsResponseDto,
} from './dto'

const greenApiHttp = axios.create({
	headers: { 'Content-Type': 'application/json' },
})

function normalizeApiUrl(apiUrl: string): string {
	return normalizeBaseGreenApiUrl(apiUrl).replace(/\/$/, '')
}

function buildApiPath(
	credentials: GreenApiCredentials,
	method: string
): string {
	const base = normalizeApiUrl(credentials.apiUrl || DEFAULT_API_URL)
	const { idInstance, apiTokenInstance } = credentials
	const path = `/waInstance${idInstance}/${method}/${apiTokenInstance}`

	return `${base}${path}`
}

function appendQueryParam(
	path: string,
	key: string,
	value: string | number
): string {
	const separator = path.includes('?') ? '&' : '?'
	return `${path}${separator}${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
}

function normalizeResponseData<T>(data: unknown): T {
	if (data === '' || data === null || data === undefined) {
		return {} as T
	}
	return data as T
}

async function request<T>(config: AxiosRequestConfig): Promise<T> {
	try {
		const response = await greenApiHttp.request<T>(config)
		return normalizeResponseData<T>(response.data)
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const responseData = error.response?.data
			const message =
				typeof responseData === 'string'
					? responseData
					: responseData !== undefined
						? JSON.stringify(responseData)
						: error.message
			throw new Error(message || `HTTP ${error.response?.status ?? 'unknown'}`)
		}
		throw error
	}
}

export async function sendMessage(
	credentials: GreenApiCredentials,
	chatId: string,
	message: string
): Promise<SendMessageResponseDto> {
	const url = buildApiPath(credentials, 'sendMessage')
	const data: SendMessageRequestDto = { chatId, message }
	return request<SendMessageResponseDto>({
		url,
		method: 'POST',
		data,
	})
}

export async function receiveNotification(
	credentials: GreenApiCredentials,
	receiveTimeout: ReceiveNotificationQueryDto['receiveTimeout'] = 5
): Promise<ReceiveNotificationResponseDto | null> {
	const url = appendQueryParam(
		buildApiPath(credentials, 'receiveNotification'),
		'receiveTimeout',
		receiveTimeout
	)
	const data = await request<ReceiveNotificationResponseDto | null>({
		url,
		method: 'GET',
	})
	if (!data?.receiptId) {
		return null
	}
	return data
}

export async function deleteNotification(
	credentials: GreenApiCredentials,
	receiptId: number
): Promise<DeleteNotificationResponseDto> {
	const url = `${buildApiPath(credentials, 'deleteNotification')}/${receiptId}`
	return request<DeleteNotificationResponseDto>({ url, method: 'DELETE' })
}

export async function setInstanceSettings(
	credentials: GreenApiCredentials
): Promise<SetSettingsResponseDto> {
	const url = buildApiPath(credentials, 'setSettings')
	const data: SetSettingsRequestDto = {
		webhookUrl: '',
		outgoingWebhook: 'yes',
		stateWebhook: 'yes',
		incomingWebhook: 'yes',
	}

	return request<SetSettingsResponseDto>({
		url,
		method: 'POST',
		data,
	})
}
