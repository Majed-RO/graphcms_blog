import React, { useState, useEffect } from 'react';
import { sdkClient } from '../clients/graphql-request';
import AdjacentPostCard from '../components/AdjacentPostCard';
import { GetAdjacentPostsQuery } from '../generated/graphql';

const AdjacentPosts = ({
	createdAt,
	slug
}: {
	createdAt: Date;
	slug: string;
}) => {
	const [adjacentPost, setAdjacentPost] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	useEffect(() => {
		sdkClient.GetAdjacentPosts({ createdAt, slug }).then(result => {
			// setAdjacentPost(result);
      /* @see https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately */
			setAdjacentPost((prevState : GetAdjacentPostsQuery) => ({
				...prevState,
				...result
			}));
			setDataLoaded(true);
		});
	}, [slug]);

	/* useEffect(() => {
		setDataLoaded(true);
	}, [adjacentPost]); */

	return (
		<div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
			{dataLoaded && (
				<>
					{adjacentPost?.previous.length && (
						<div
							className={`${
								adjacentPost.next
									? 'col-span-1 lg:col-span-4'
									: 'col-span-1 lg:col-span-8'
							} adjacent-post rounded-lg relative h-72`}
						>
							<AdjacentPostCard
								post={
									adjacentPost
										.previous[0]
								}
								position="LEFT"
							/>
						</div>
					)}
					{adjacentPost?.next.length && (
						<div
							className={`${
								adjacentPost.previous
									? 'col-span-1 lg:col-span-4'
									: 'col-span-1 lg:col-span-8'
							} adjacent-post rounded-lg relative h-72 `}
						>
							<AdjacentPostCard
								post={
									adjacentPost
										.next[0]
								}
								position="RIGHT"
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AdjacentPosts;
