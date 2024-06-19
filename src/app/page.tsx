import { Bookmarks } from '@/features/bookmarks'
import { AddBookmark } from '@/features/bookmarks/view'
import dynamic, { Loader } from 'next/dynamic'

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
			<div className='flex flex-wrap items-center gap-12'>
				<Bookmarks />
			</div>
			<SaveDataLocal />
		</div>
	)
}
