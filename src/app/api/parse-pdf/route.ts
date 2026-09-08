import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const pdfParse = require("pdf-parse");
    const data = await pdfParse(Buffer.from(buffer));

    return NextResponse.json({ text: data.text });
  } catch (err: unknown) {
    console.error("PDF Parse error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to parse PDF" },
      { status: 500 }
    );
  }
}
