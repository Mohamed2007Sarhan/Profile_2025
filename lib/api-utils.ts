import { NextRequest, NextResponse } from 'next/server';
import { verifySession, getSessionUsername } from './session';

export function verifyAdminSession(request: NextRequest) {
  // Get session token from cookies
  const sessionToken = request.cookies.get('admin-session')?.value;
  
  if (!sessionToken || !verifySession(sessionToken)) {
    return {
      isAuthorized: false,
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    };
  }

  return {
    isAuthorized: true,
    username: getSessionUsername(sessionToken) as string
  };
}
