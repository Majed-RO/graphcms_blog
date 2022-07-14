// import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import Head from 'next/head';
import { sdkClient } from '../src/clients/graphql-request';
import { PostCard, PostWidget, Categories } from '../src/components';
import { PostEdge } from '../src/generated/graphql';
import { FeaturedPosts } from '../src/sections';

/* https://nextjs.org/docs/api-reference/data-fetching/get-static-props */
const Home = ({ posts }: { posts: PostEdge[] }) => {
	return (
		<div className="container mx-auto px-10 mb-8 ">
			<Head>
				<title>CMS Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
      <FeaturedPosts />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
				<div className="md:col-span-8 col-span-1 ">
					{posts.map((post: PostEdge) => {
						return (
							<PostCard
								key={
									post.node.title
								}
								post={post.node}
							/>
						);
					})}
				</div>
				<div className="lg:col-span-4 col-span-1">
					<div className="lg:sticky relative top-8">
						<PostWidget />
						<Categories />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	const posts = (await sdkClient.getPosts()) ;

	return {
		props: {
			posts: posts.postsConnection.edges
		}
	};
};
