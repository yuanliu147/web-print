import { Button, Space } from 'antd'

import './style.scss'

export default function EditorHeader() {
	return (
		<div className="header">
			<Space>
				<Button type="primary">保存</Button>
			</Space>
		</div>
	)
}
