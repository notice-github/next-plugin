interface NTCWebElement {
	tagName: string
	attributes?: Record<string, string>
	innerText?: string
	innerHTML?: string
}

export interface NTCDocument {
	id: string
	head: NTCWebElement[]
	meta?: NTCWebElement[]
	style: string
	script: string
	body: string
}
