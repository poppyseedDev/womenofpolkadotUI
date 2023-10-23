// pages/api/user.ts

import { NextApiRequest, NextApiResponse } from 'next';

let mockDatabase: any[] = [];

const isValidUserData = (data: any) => {
  return (
    typeof data.firstName === 'string' &&
    typeof data.lastName === 'string' &&
    (data.sex === 'male' || data.sex === 'female') &&
    typeof data.twitterAccount === 'string' &&
    typeof data.gmail === 'string' &&
    typeof data.accountString === 'string'
  );
};

const saveToDatabase = (data: any) => {
  mockDatabase.push(data);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userData = req.body;

    if (!isValidUserData(userData)) {
      res.status(400).json({ error: 'Invalid user data' });
      return;
    }

    saveToDatabase(userData);
    console.log("Saved user data:", userData);
    
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
