import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log("running");
    return NextResponse.next();
  }
  