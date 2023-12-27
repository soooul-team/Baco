// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {cookies} from "next/headers";
import {createClient} from "@/pages/api/utils/supabase/server";

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {data: notes} = await supabase.from('notes').select()
    res.status(200).json({name: JSON.stringify(notes)})
}
