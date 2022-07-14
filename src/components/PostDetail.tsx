import React from 'react';
import { Post } from '../generated/graphql';
import PostMeta from './PostMeta';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { defaultContentRenderer } from '../renderers/default-content';

const PostDetail = ({ post }: { post: Post }) => {
  
	return (
		<div className="bg-white shadow-lg rounded-lg pb-12 lg:pb-8 mb-8">
			<div className="relative overflow-hidden shadow-md mb-6 w-full">
				<img
					src={post.featuredImage.url}
					alt={post.title}
					className="object-top h-full w-full rounded-t-lg"
				/>
			</div>
			<div className="px-4">
				<div className="flex items-center mb-8 w-full">
					{/**
					 * @see  {@link https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string}
					 **/}
					<PostMeta
						author={post?.author!}
						postDate={post.createdAt}
					/>
				</div>
				<h1 className="mb-8 text-3xl font-semibold">
					{post.title}
				</h1>

				{/* <div dangerouslySetInnerHTML={{__html: post.content.html}} /> */}
				{/* See: https://hygraph.com/blog/hygraph-rich-text-react */}
				<RichText
					content={post.content.json}
					references={post.content.references}
					renderers={{
						...defaultContentRenderer
					}}
				/>
			</div>
		</div>
	);
};

export default PostDetail;
