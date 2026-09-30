// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'

import type { Chat } from '@/entities/chat'

import { ChatWindow } from './ChatWindow'

const sampleChat: Chat = {
	chatId: '79876543210@c.us',
	title: '+7 (987) 654-32-10',
	phoneNumber: '79876543210',
	messages: [
		{
			id: '1',
			text: 'Привет!',
			timestamp: Date.now() - 60_000,
			isOutgoing: false,
		},
		{
			id: '2',
			text: 'Привет! Чем могу помочь?',
			timestamp: Date.now() - 30_000,
			isOutgoing: true,
		},
	],
}

const meta = {
	title: 'widgets/ChatWindow',
	component: ChatWindow,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Окно активного чата: шапка с контактом, список сообщений и поле ввода. Если чат не выбран, показывает заглушку.',
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ height: 640, display: 'flex', flex: 1, minWidth: 480 }}>
				<Story />
			</div>
		),
	],
	args: {
		onSendMessage: fn(async () => undefined),
	},
} satisfies Meta<typeof ChatWindow>

export default meta
type Story = StoryObj<typeof meta>

export const WithChat: Story = {
	args: {
		chat: sampleChat,
	},
}

export const EmptySelection: Story = {
	args: {
		chat: null,
	},
}

export const NewChatWithoutMessages: Story = {
	args: {
		chat: {
			chatId: '79990001122@c.us',
			title: '+7 (999) 000-11-22',
			phoneNumber: '79990001122',
			messages: [],
		},
	},
}
