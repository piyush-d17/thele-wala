// src/app/api/seller/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  // Here, you can process the form data, like saving it to a database
  console.log('Received data:', data);

  return NextResponse.json({ message: 'Seller data received', data });
}