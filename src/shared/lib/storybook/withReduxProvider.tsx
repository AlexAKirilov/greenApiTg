import React from 'react'
import { Provider } from 'react-redux'

import {
	createStoryStore,
	type StoryStorePreloadedState,
} from './createStoryStore'

export function withReduxProvider(preloadedState?: StoryStorePreloadedState) {
	const store = createStoryStore(preloadedState)

	return function ReduxProviderDecorator(Story: React.ComponentType) {
		return (
			<Provider store={store}>
				<Story />
			</Provider>
		)
	}
}
