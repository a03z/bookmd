'use client'

import { list } from '@effector/reflect'
import { $bookmarks, IBookmark, addBookmarkFx, removeBookmark } from './model'
import Image from 'next/image'
import { $selectedFolder } from '../folders/model'
import { BiCheck, BiTrashAlt } from 'react-icons/bi'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

export const Bookmarks = list({
	source: $bookmarks,
	view: (
		item: IBookmark & {
			selectedFolder: string
			removeBookmark: (id: string) => void
		}
	) => {
		if (item.selectedFolder !== '' && item.selectedFolder !== item.folderId)
			return null
		return (
			<div
				onClick={() => {
					window.open(item.requestUrl, '_blank')
				}}
				className='h-28 w-96 bg-secondary rounded-2xl cursor-pointer flex relative'>
				<button
					onClick={(e) => {
						e.stopPropagation()
						item.removeBookmark(item.id)
					}}
					className='absolute top-2 right-2 opacity-30 hover:opacity-100 transition-all duration-300'>
					<BiTrashAlt size={24} />
				</button>
				<Image
					className='w-28 h-28 object-cover rounded-l-2xl bg-light-blue'
					width={120}
					height={120}
					alt={item.ogTitle}
					src={item.ogImage[0]?.url}
				/>
				<div className='h-full w-1.5 bg-aqua'></div>
				<div className='w-4/6 px-4 py-2'>
					<p className='font-bold text-xl whitespace-nowrap text-ellipsis overflow-hidden'>
						{item.ogTitle}
					</p>
					<hr className='w-[calc(100%+2rem)] -ml-4 h-1 my-2' />
					<p className='text-md whitespace-nowrap text-ellipsis overflow-hidden'>
						{item.ogDescription || item.ogTitle}
					</p>
				</div>
			</div>
		)
	},
	bind: {
		selectedFolder: $selectedFolder,
		removeBookmark: removeBookmark,
	},
})

export const AddBookmark = () => {
	const [bookmarkUrl, setBookmarkUrl] = useState('')
	const [addBookmarkFn] = useUnit([addBookmarkFx])

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				addBookmarkFn(bookmarkUrl)
				setBookmarkUrl('')
			}}>
			<p>
				Before submitting, select a folder to place the bookmark in a
				specific folder.
			</p>
			<input
				className='text-primary rounded-md w-full h-12 text-2xl'
				value={bookmarkUrl}
				onChange={(e) => setBookmarkUrl(e.target.value)}
			/>
			<input type='submit' hidden />
		</form>
	)
}
