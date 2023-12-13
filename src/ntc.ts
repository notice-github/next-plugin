import type { NTCFragment, NTCPage, NTCParams, NTCQueryOptions, NTCWebElement } from './types'

async function query<T = any>(path: string, opts?: NTCQueryOptions): Promise<T> {
	opts ??= {}
	opts.serverURL ??= 'https://bdn.notice.studio'
	opts.params ??= {}

	const url = new URL(opts.serverURL + (!path.startsWith('/') ? '/' : '') + path)
	for (let [key, value] of Object.entries(opts.params)) {
		url.searchParams.set(key, value)
	}

	const data = await fetch(url).then(async (res) => {
		if (!res.ok) {
			try {
				const data = await res.json()
				throw new Error(data.error.message || data.error.type)
			} catch (_) {
				throw new Error('Unknown error')
			}
		} else {
			const data = res.headers.get('Content-Type')?.startsWith('application/json') ? await res.json() : await res.text()
			return data
		}
	})

	return data
}

export namespace NTC {
	export async function fragment(params: NTCParams & { pageId: string }) {
		const { pageId, ..._params } = params

		const result = await query(`/document/${pageId}`, {
			params: { ..._params, format: 'fragmented', integration: 'next-plugin' },
		})

		return result as NTCFragment
	}

	export async function pages(params: Pick<NTCParams, 'lang'> & { blockId: string }) {
		const { blockId, ..._params } = params

		const result = await query(`/blocks/${blockId}/pages`, { params: _params })

		return result.data as NTCPage[]
	}

	export async function head(params: NTCParams & { pageId: string }) {
		const { pageId, ..._params } = params

		// TODO change for a head route only
		const result = await query(`/document/${pageId}`, {
			params: { ..._params, format: 'fragmented', integration: 'next-plugin' },
		})

		return [...result.head, ...result.meta] as NTCWebElement[]
	}

	export async function markdown(params: Pick<NTCParams, 'lang'> & { pageId: string }) {
		const { pageId, ..._params } = params

		const result = await query(`/document/${pageId}`, {
			params: { ..._params, format: 'markdown', integration: 'next-plugin' },
		})

		return result as string
	}
}
