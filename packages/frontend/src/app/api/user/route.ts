import prisma from "@app/libs/prisma";
import { NextResponse } from "next/server";

// Notice the funciton definiton:
export async function GET(request: Request) {
    return NextResponse.json(
      { error: "Method not allowed" },
      {
        status: 405
      }
    );
  }

  export async function POST(request: Request) {
    try {
      const body = await request.json();
  
      const { firstName, lastName, sex, twitterAccount, telegramAccount, email, accountString } = body;
      console.log('body', body)
      const user = await prisma.user.create({
        data: { firstName, lastName, sex, twitterAccount, telegramAccount, email, accountString }
      });
      return NextResponse.json(user);
    } catch (error: any) {
      console.log({ error });
      return NextResponse.json(
        { error: error.message },
        {
          status: 500
        }
      );
    }
  }
  