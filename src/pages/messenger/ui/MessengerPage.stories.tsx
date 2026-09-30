// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import { DEFAULT_API_URL } from '@/shared/config/constants'
import { withAuthCredentials } from '@/shared/lib/storybook/withAuthCredentials'
import { withReduxProvider } from '@/shared/lib/storybook/withReduxProvider'

import { MessengerPage } from './MessengerPage'

const meta = {
	title: 'pages/MessengerPage',
	component: MessengerPage,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Страница мессенджера после авторизации: список чатов, отправка сообщений через GREEN-API и polling входящих уведомлений. Учётные данные — localStorage, чаты — Redux с сохранением в localStorage, активный чат — в URL.',
			},
		},
		layout: 'fullscreen',
	},
	decorators: [
		withAuthCredentials({
			apiUrl: DEFAULT_API_URL,
			idInstance: '1100000000',
			apiTokenInstance: 'demo-token',
		}),
		withReduxProvider(),
		(Story) => (
			<MemoryRouter initialEntries={['/c']}>
				<Story />
			</MemoryRouter>
		),
	],
} satisfies Meta<typeof MessengerPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
