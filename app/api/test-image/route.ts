import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test the image worker endpoint
    const testUrl = '/workers/image?src=/images/stock-radio-mixer.jpg';
    
    return NextResponse.json({
      success: true,
      message: 'Image worker test endpoint',
      testUrl: testUrl,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}