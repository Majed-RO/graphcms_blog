import { GetStaticPaths, GetStaticProps } from 'next';
import { sdkClient } from '../../src/clients/graphql-request';

import {
	Categories,
	PostWidget,
	Author,
	Comments,
	CommentsForm,
	PostDetail
} from '../../src/components';
import { Post } from '../../src/generated/graphql';
import { AdjacentPosts } from '../../src/sections';

const PostDetails = ({ post }: { post: Post }) => {
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="col-span-1 lg:col-span-8">
					<PostDetail post={post} />
					<Author author={post.author!} />
					<AdjacentPosts
						slug={post.slug}
						createdAt={post.createdAt}
					/>

					<CommentsForm slug={post.slug} />
					<Comments slug={post.slug} />
				</div>
				<div className="col-span-1 lg:col-span-4">
					<div className="relative lg:sticky top-8">
						<PostWidget
							slug={post.slug}
							categories={post.categories.map(
								category =>
									category.slug
							)}
						/>
						<Categories />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostDetails;

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await sdkClient.getPosts();

	const paths = posts.postsConnection.edges.map(({ node: { slug } }) => ({
		params: { slug }
	}));

	return {
		paths,
		fallback: false
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const data = await sdkClient.GetPostDetails({
		slug: params?.slug as string
	});

	return {
		props: {
			post: { ...data.post }
		}
	};
};
