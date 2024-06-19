import { combine } from 'effector'
import { addBookmarkFx } from '../bookmarks/model'

export const $isLoading = combine([
	// add another effects here if needed
	addBookmarkFx.pending,
])
