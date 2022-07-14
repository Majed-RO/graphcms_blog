// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sdkClient } from '../../src/clients/graphql-request';

const TOKEN = process.env.GRAPHCMS_TOKEN;

/** 
* @see {@link: https://github.com/prisma-labs/graphql-request#authentication-via-http-header}
*/
export default async function comments(
	req: NextApiRequest,
	res: NextApiResponse
) {
		const result = await sdkClient.CreateComment(
			{
				name: req.body.name,
				email: req.body.email,
				comment: req.body.comment,
				slug: req.body.slug
			},
			{
				authorization: `Bearer ${TOKEN}`
			}
		);

		return res.status(200).json(result);
		
	
}
