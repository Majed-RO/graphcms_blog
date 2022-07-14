import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sdkClient } from '../clients/graphql-request';
import {  Post } from '../generated/graphql';

const PostWidget = ({
	categories,
	slug
}: {
	categories?: string[];
	slug?: string;
}) => {
	const [relatedOrRecentPosts, setRelatedOrRecentPosts] = useState([]);

	useEffect(() => {
		if (slug) {
			sdkClient
				.GetSimilarPosts({slug: slug, categories})
				.then((result: any) => {
					setRelatedOrRecentPosts(result.posts)
        });
		} else {
			sdkClient.GetRecentPosts().then((result: any) => {
				setRelatedOrRecentPosts(result.posts);
			});
		}
	}, [slug]);


	return (
		<div className="bg-white p-8 mb-8 shadow-lg rounded-lg">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				{slug ? 'Related Posts' : 'Recent Posts'}
			</h3>
			{relatedOrRecentPosts.map((post: Post) => (
				<div
					className="flex items-center w-full mb-4"
					key={post.title}
				>
					<div className="w-16 h-16 flex-none">
						<img
							
							src={
								post
									.featuredImage
									.url
							}
							alt={post.title}
              className='align-middle rounded-full w-12 h-12'
						/>
					</div>
          <div className='flex-grow ml-4'>
              <p className='text-gray-500 text-xs'>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link href={`/post/${post.slug}`}><a className='text-base'>{post.title}</a></Link>
          </div>
				</div>
			))}
		</div>
	);
};

export default PostWidget;
