import cn from 'classnames'
import React, { FC } from 'react'

import { getInitial } from '@/shared/lib/getInitial'

import styles from './Avatar.module.css'

type AvatarSize = 'sm' | 'md'
type AvatarTone = 'default' | 'muted'

export interface AvatarProps {
	name: string
	size?: AvatarSize
	tone?: AvatarTone
}

export const Avatar: FC<AvatarProps> = (props) => {
	const { name, size = 'md', tone = 'default' } = props

	return (
		<div
			className={cn(
				styles.avatar,
				styles[size],
				tone === 'muted' && styles.muted
			)}
			aria-hidden
		>
			{getInitial(name)}
		</div>
	)
}
