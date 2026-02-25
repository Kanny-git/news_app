import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'general';
    const query = searchParams.get('q');
    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
        return NextResponse.json(
            { error: 'GNEWS_API_KEY is not configured. Please add it to your .env.local file.' },
            { status: 500 }
        );
    }

    let url = '';
    if (query) {
        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=ja&country=jp&max=10&apikey=${apiKey}`;
    } else {
        url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=ja&country=jp&max=10&apikey=${apiKey}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch news');
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
