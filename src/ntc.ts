import type { NTCParams } from '@notice-org/ntc'
import type { NTCDocument } from './types'

import { NTCBase } from '@notice-org/ntc'

export namespace NTC {
	export async function query({ pageId, ...params }: NTCParams) {
		const result = await NTCBase.queryDocument(pageId, params)
		if (!result.ok) throw new Error(result.error)
		return result.data as NTCDocument
	}
}
