'use client'

import axios from 'axios'
import { attach, createEffect, createEvent, createStore } from 'effector'
import { v4 as uuidv4 } from 'uuid'
import { $selectedFolder } from '../folders/model'

export interface IBookmark {
	id: string
	folderId: string
	ogTitle: string
	ogImage: {
		url: string
		type: string
		alt?: string
		height?: string
		width?: string
	}[]
	requestUrl: string
	ogDescription?: string
}

const savedBookmarks =
	typeof window !== 'undefined' && localStorage.getItem('bookmarks')

// effects
export const addBookmarkBaseFx = createEffect(
	async ({
		url,
		selectedFolder,
	}: {
		url: string
		selectedFolder: string
	}) => {
		const res = await axios.get(`/api/og-scrap?url=${url}`)
		return {
			id: uuidv4(),
			ogImage: res.data.ogImage,
			ogTitle: res.data.ogTitle,
			ogDescription: res.data.ogDescription,
			requestUrl: url,
			folderId: selectedFolder,
		}
	}
)
export const addBookmarkFx = attach({
	source: $selectedFolder,
	effect: addBookmarkBaseFx,
	mapParams: (url: string, source) => {
		return {
			url,
			selectedFolder: source,
		}
	},
})

// events
export const removeBookmark = createEvent<string>()
export const bookmarksChanged = createEvent<IBookmark[]>()

// stores
export const $bookmarks = createStore<IBookmark[]>(
	savedBookmarks ? JSON.parse(savedBookmarks) : []
)

// handlers

$bookmarks.watch((s) => {
	typeof window !== 'undefined' &&
		localStorage.setItem('bookmarks', JSON.stringify(s))
})

$bookmarks
	.on(removeBookmark, (state, payload) => {
		return state.filter((bookmark) => bookmark.id !== payload)
	})
	.on(addBookmarkFx.done, (state, payload) => {
		return [...state, payload.result]
	})
	.on(bookmarksChanged, (_, payload) => payload)
