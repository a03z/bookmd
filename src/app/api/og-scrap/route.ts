import { NextRequest, NextResponse } from 'next/server'
import ogs from 'open-graph-scraper'

export async function GET(req: NextRequest) {
	try {
		const data = await ogs({
			url: req.nextUrl.searchParams.get('url') || undefined,
		})
		return NextResponse.json(data.result)
	} catch (e) {
		return NextResponse.json(e)
	}
}
