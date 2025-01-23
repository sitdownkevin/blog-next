import ical from "node-ical";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Edge Runtime 不支持 node-ical，移除 edge runtime
// export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
      const url = "https://calendar.google.com/calendar/ical/kexu567%40gmail.com/public/basic.ics";

      const response = await fetch(url, {
        next: {
          revalidate: 300, // 5分钟缓存
          tags: ["calendar"]
        }
      });

        if (!response.ok) {
            throw new Error("Failed to fetch calendar data");
        }

        const icsData = await response.text();
        const events = await ical.async.parseICS(icsData);

        const formattedEvents = Object.values(events)
            .filter(event => event.type === "VEVENT")
            .map(event => ({
                title: event.summary,
                start: event.start,
                end: event.end,
                description: event.description,
                location: event.location,
            }));

        return NextResponse.json(
            { events: formattedEvents },
            {
                status: 200,
                headers: {
                  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
                  "Content-Type": "application/json",
                }
            }
        );
    } catch (error) {
        // console.error("Calendar API Error:", error);
        return NextResponse.json(
            { error: error.message },
            {
                status: 500,
                headers: {
                  "Content-Type": "application/json",
                }
            }
        );
    }
}

// 手动重新验证缓存的函数
export async function revalidateCalendar() {
    try {
        revalidateTag("calendar");
        return { revalidated: true, now: Date.now() };
    } catch (error) {
        return { revalidated: false, error: error.message };
    }
}