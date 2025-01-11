// lowercase-url-middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  // Clone the current URL
  const url = req.nextUrl.clone();
  const originalPath = url.pathname; // Original requested path
  const lowerCasePath = originalPath.toLowerCase(); // Convert to lowercase

  // Log the original and processed paths for debugging
  console.log(`Original Path: ${originalPath}`);
  console.log(`Processed Path: ${lowerCasePath}`);

  // Redirect if the path is not already in lowercase
  if (originalPath !== lowerCasePath) {
    console.log(`Redirecting to: ${lowerCasePath}`);
    url.pathname = lowerCasePath;
    return NextResponse.redirect(url);
  }

  console.log("No redirection needed.");
  return NextResponse.next();
}
