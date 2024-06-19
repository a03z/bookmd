'use client'

import { bookmarksChanged } from '../bookmarks/model'
import { foldersChanged } from '../folders/model'
import { useEffect } from 'react'

export const SaveDataLocal = () => {
	useEffect(() => {
		const folderLS = localStorage.getItem('folders')
		const bookmarksLS = localStorage.getItem('bookmarks')

		bookmarksChanged(bookmarksLS ? JSON.parse(bookmarksLS) : [])
		foldersChanged(folderLS ? JSON.parse(folderLS) : [])
	}, [])

	return <></>
}
