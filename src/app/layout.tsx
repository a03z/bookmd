import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { EffectorNext } from '@effector/next'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'bookmd.',
	description: 'More convenient bookmark manager',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={raleway.className}>
				<EffectorNext>
					<div className='flex h-screen flex-col'>
						<Header />
						<div className='flex bg-primary w-full h-[calc(100vh-4rem)]'>
							<Sidebar />
							<div className='h-full bg-secondary w-1.5'></div>
							<main className='flex-1 h-full w-full'>
								{children}
							</main>
						</div>
					</div>
				</EffectorNext>
			</body>
		</html>
	)
}
