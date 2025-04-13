import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import AntdProvider from '@/components/AntdProvider'
import 'normalize.css'
import './global.scss'

export const metadata: Metadata = {
	title: 'web 打印基础服务',
	description: '一站式解决web打印需求',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<AntdRegistry>
					<AntdProvider>{children}</AntdProvider>
				</AntdRegistry>
			</body>
		</html>
	)
}
