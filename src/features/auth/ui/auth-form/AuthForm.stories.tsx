// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'

import { AuthForm } from './AuthForm'

const meta = {
	title: 'features/AuthForm',
	component: AuthForm,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Форма входа с учётными данными GREEN-API: API URL, idInstance и apiTokenInstance. После успешной валидации вызывает `onSubmit` с объектом credentials.',
			},
		},
		layout: 'fullscreen',
	},
	args: {
		onSubmit: fn(),
	},
} satisfies Meta<typeof AuthForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
