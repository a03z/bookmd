'use client'

import { Folders } from '@/features/folders'
import { AddFolderModal } from '@/features/folders/view'
import { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export const Sidebar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const closeModal = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			{isModalOpen && <AddFolderModal closeModal={closeModal} />}
			<aside className='w-1/4 min-w-20rem h-full p-8 relative'>
				<div className='flex flex-col gap-8 justify-center items-center'>
					<Folders />
				</div>

				<button
					onClick={() => {
						setIsModalOpen(true)
					}}
					className='absolute bottom-8 right-8  w-12 h-10 bg-secondary rounded-xl flex items-center justify-center'>
					<AiOutlinePlusCircle size={24} />
				</button>
			</aside>
		</>
	)
}
