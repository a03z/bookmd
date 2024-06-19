import { Bookmarks, AddBookmark } from '@/features/bookmarks'
import dynamic from 'next/dynamic'

const SaveDataLocal = dynamic(
	() => import('@/features/localSave').then((module) => module.SaveDataLocal),
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
