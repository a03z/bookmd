'use client'

import { combine } from 'effector'
import { addBookmarkFx } from '../bookmarks'

export const $isFetching = combine(
	[
		// add another effects here if needed
		addBookmarkFx.pending,
	],
	(pendings) => pendings.some(Boolean)
)
$isFetching.watch((s) => console.log(s))
