export type NTCParams = {
	lang?: string
	theme?: 'light' | 'dark'
	navigationType?: 'query' | 'slash' | 'memory'
	layout?: 'empty' | 'page' | 'full'
}

export interface NTCQueryOptions {
	params?: Record<string, any>
	serverURL?: string
}

export interface NTCWebElement {
	tagName: string
	attributes?: Record<string, string>
	innerText?: string
	innerHTML?: string
}

export interface NTCFragment {
	id: string
	head: NTCWebElement[]
	meta?: NTCWebElement[]
	style: string
	script: string
	body: string
}

export interface NTCPage {
	id: string
	type: 'page'
	data: {
		text: string
		cover: string
		displayCover: boolean
		displaySummary: boolean
		displayBorder: boolean
	}
	metadata: {
		slug: string
		timeToRead: number
		summary: string
	}
	blockIds: string[]
	rootId: string
}
