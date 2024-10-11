import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (token !== process.env.API_TOKEN) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    revalidatePath('/', 'layout');

    return Response.json({ revalidated: true }, { status: 200 });
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
