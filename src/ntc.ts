import type { NTCParams } from '@notice-org/ntc'
import type { NTCDocument } from './types'

import { NTCBase } from '@notice-org/ntc'

export namespace NTC {
	export async function document(_params: NTCParams) {
		const { pageId, ...params } = _params as Record<string, any>
		params['integration'] = 'next-plugin'

		const result = await NTCBase.queryDocument(pageId, params)
		if (!result.ok) return { ok: false, error: result.error }

		return { ok: true, data: result.data as NTCDocument }
	}
}
