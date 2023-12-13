import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'NoticeNext',
			fileName: 'notice',
		},
		rollupOptions: {
			external: [/^react$/, /^next\/?.*$/],
			output: {
				dir: 'lib',
				globals: {
					react: 'React',
					'next/head.js': 'Head',
				},
			},
		},
	},
})
