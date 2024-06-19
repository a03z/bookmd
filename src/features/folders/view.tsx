'use client'

import { list } from '@effector/reflect'
import {
	$folders,
	$selectedFolder,
	IFolder,
	addFolder,
	removeFolder,
	selectFolder,
} from './model'
import { BiTrashAlt } from 'react-icons/bi'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { v4 as uuidv4 } from 'uuid'

export const AddFolderModal = ({ closeModal }: { closeModal: () => void }) => {
	const [addFolderFn] = useUnit([addFolder])
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	return (
		<div className='text-2xl font-bold z-40 w-full h-full fixed inset-0 flex justify-center items-center backdrop-filter backdrop-brightness-75 backdrop-blur-md'>
			<div className='w-[500px] bg-secondary rounded-2xl flex flex-col p-4 gap-4'>
				<h2 className='text-center text-2xl font-semibold'>
					New Folder
				</h2>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col'>
						<p>Name</p>
						<input
							value={name}
							onChange={(e) => {
								setName(e.target.value)
							}}
							className='rounded-md text-primary px-4'
							type='text'
						/>
					</div>
					<div className='flex flex-col'>
						<p>Description</p>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='rounded-md text-primary px-4 resize-none'
						/>
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<button
						onClick={closeModal}
						className='w-40 py-2 bg-primary rounded-lg text-aqua'>
						Cancel
					</button>
					<button
						onClick={() => {
							addFolderFn({ name, description, id: uuidv4() })
							closeModal()
						}}
						className='w-40 py-2 bg-aqua rounded-lg text-primary'>
						Done
					</button>
				</div>
			</div>
		</div>
	)
}

export const Folders = list({
	source: $folders,
	view: (
		item: IFolder & {
			selectFolder: (id: string) => void
			removeFolder: (id: string) => void
			selectedFolder: string
		}
	) => {
		return (
			<div
				onClick={() => {
					item.selectFolder(item.id)
				}}
				className={`w-full max-w-96 bg-secondary rounded-2xl px-4 py-4 relative cursor-pointer ${
					item.selectedFolder === item.id
						? 'shadow-lg shadow-aqua'
						: ''
				}`}>
				{item.id !== '' && (
					<button
						onClick={(e) => {
							e.stopPropagation()
							item.removeFolder(item.id)
						}}
						className='absolute top-4 right-4 opacity-30 hover:opacity-100 transition-all duration-300'>
						<BiTrashAlt size={24} />
					</button>
				)}
				<p className='font-bold text-xl'>{item.name}</p>
				<hr className='w-[calc(100%+2rem)] -ml-4 h-1 my-2' />
				<p className='text-lg'>{item.description}</p>
			</div>
		)
	},
	bind: {
		selectFolder: selectFolder,
		removeFolder: removeFolder,
		selectedFolder: $selectedFolder,
	},
})
