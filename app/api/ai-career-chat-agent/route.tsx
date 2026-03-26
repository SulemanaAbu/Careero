import { inngest } from "@/inngest/client";
import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const MAX_ATTEMPTS = 40;

export async function POST(req: any) {
    try {
        const { userInput } = await req.json();

        if (!userInput) {
            return NextResponse.json({ error: 'userInput is required' }, { status: 400 });
        }

        const recordId = uuidv4();

        await inngest.send({
            name: 'AiCareerAgent',
            data: { userInput, recordId }
        });

        // Poll database for result
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const result = await db.select()
                .from(HistoryTable)
                .where(eq(HistoryTable.recordId, recordId));

            if (result?.[0]?.content) {
                console.log('Got result from DB:', result[0].content);
                return NextResponse.json(result[0].content);
            }

            console.log(`Attempt ${attempt + 1} - waiting for DB result...`);
        }

        return NextResponse.json(
            { error: 'Timed out waiting for AI response' },
            { status: 504 }
        );

    } catch (err: any) {
        console.error('AI career chat agent error:', err?.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}