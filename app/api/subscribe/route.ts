import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY?.trim();
    const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID?.trim();

    const response = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          revision: "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email,
                      subscriptions: {
                        email: {
                          marketing: {
                            consent: "SUBSCRIBED",
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
            // list goes in relationships, NOT attributes
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: KLAVIYO_LIST_ID,
                },
              },
            },
          },
        }),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Klaviyo Error:", text);
      return NextResponse.json({ error: text }, { status: response.status });
    }

    // 202 Accepted — async job queued, no body
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
