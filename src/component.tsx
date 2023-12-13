import type { DOMElement, FC } from 'react'
import type { NTCFragment } from './types'

import Head from 'next/head.js'
import React from 'react'

interface Props {
	fragment: NTCFragment
}

export const Notice: FC<Props> = ({ fragment }) => {
	const heads: DOMElement<any, Element>[] = []

	for (let elem of [...fragment.head, ...(fragment.meta ?? [])]) {
		let element: DOMElement<any, Element>
		if (elem.innerHTML) {
			element = React.createElement(elem.tagName, {
				...elem.attributes,
				dangerouslySetInnerHTML: { __html: elem.innerHTML },
			})
		} else if (elem.innerText) {
			element = React.createElement(elem.tagName, elem.attributes, [elem.innerText])
		} else {
			element = React.createElement(elem.tagName, elem.attributes)
		}

		heads.push(element)
	}

	return (
		<>
			<Head>
				{...heads}
				<style id={`NTC_style-${fragment.id}`} dangerouslySetInnerHTML={{ __html: fragment.style }}></style>
				<script id={`NTC_script-${fragment.id}`} dangerouslySetInnerHTML={{ __html: fragment.script }}></script>
			</Head>
			<div
				id={fragment.id}
				className="NTC_wrapper"
				dangerouslySetInnerHTML={{ __html: typeof window === 'undefined' ? wrapperInnerHTML(fragment.body) : '' }}
			></div>
		</>
	)
}

const wrapperInnerHTML = (body: string) => {
	const regex = /^\s*<div id="[0-9a-f\-]{36}" class="NTC_wrapper">((.|\n)+)<\/div>\s*$/i
	const match = body.match(regex)
	return match?.[1] ?? ''
}
