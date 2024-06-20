import { AddBookmark } from '@/features/bookmarks'
import { SaveDataLocal } from '@/features/localSave'
import dynamic from 'next/dynamic'

// prevent hydration warning when setting data to state from localStorage
const Bookmarks = dynamic(
	() => import('@/features/bookmarks').then((module) => module.Bookmarks),
	{
		ssr: false,
	}
)

export default function Home() {
	return (
		<div className='flex flex-col gap-12 p-8'>
			<AddBookmark />
			<Bookmarks />
			<SaveDataLocal />
		</div>
	)
}
