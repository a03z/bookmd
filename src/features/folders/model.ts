'use client'

import { createEvent, createStore, sample } from 'effector'

export interface IFolder {
	name: string
	description?: string
	id: string
}

const savedFolders =
	typeof window !== 'undefined' ? localStorage?.getItem('folders') : '[]'

export const addFolder = createEvent<IFolder>()
export const removeFolder = createEvent<string>()
export const selectFolder = createEvent<string>()
export const foldersChanged = createEvent<IFolder[]>()

export const $folders = createStore<IFolder[]>(
	savedFolders
		? JSON.parse(savedFolders)
		: [
				{
					name: 'All',
					description: '',
					id: '',
				},
		  ]
)

export const $selectedFolder = createStore('')

sample({
	clock: removeFolder,
	target: selectFolder,
	// reset selectedFolder after deleting any folder
	fn: () => '',
})

$folders.watch((s) => {
	typeof window !== 'undefined' &&
		localStorage.setItem('folders', JSON.stringify(s))
})

$selectedFolder.on(selectFolder, (_, payload) => payload)

$folders
	.on(addFolder, (state, payload) => [...state, payload])
	.on(removeFolder, (state, payload) => {
		return state.filter((folder) => folder.id !== payload)
	})
	.on(foldersChanged, (_, payload) => payload)
