// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'

import type { Chat } from '@/entities/chat'

import { ChatList } from './ChatList'

const now = Date.now()

const sampleChats: Chat[] = [
	{
		chatId: '79876543210@c.us',
		title: '+7 (987) 654-32-10',
		phoneNumber: '79876543210',
		messages: [
			{
				id: 'm1',
				text: 'Добрый день!',
				timestamp: now - 120_000,
				isOutgoing: false,
			},
		],
	},
	{
		chatId: '79991234567@c.us',
		title: '+7 (999) 123-45-67',
		phoneNumber: '79991234567',
		messages: [
			{
				id: 'm2',
				text: 'Документы отправил',
				timestamp: now - 86_400_000,
				isOutgoing: true,
			},
		],
	},
]

const meta = {
	title: 'widgets/ChatList',
	component: ChatList,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Боковая панель со списком чатов, созданием нового чата по номеру телефона и кнопкой выхода из аккаунта.',
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ height: 640, display: 'flex' }}>
				<Story />
			</div>
		),
	],
	args: {
		chats: sampleChats,
		activeChatId: sampleChats[0].chatId,
		onSelectChat: fn(),
		onCreateChat: fn(),
		onLogout: fn(),
	},
} satisfies Meta<typeof ChatList>

export default meta
type Story = StoryObj<typeof meta>

export const WithChats: Story = {}

export const Empty: Story = {
	args: {
		chats: [],
		activeChatId: null,
	},
}

export const NoActiveChat: Story = {
	args: {
		activeChatId: null,
	},
}
