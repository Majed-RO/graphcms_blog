import React from 'react';
import { Post } from '../generated/graphql';
import Author from './PostMeta';

const PostDetail = ({ post }) => {
  
	const getContentFragment = (index, text, obj, type) => {
		let modifiedText = text;

		if (obj) {
			if (obj.bold) {
				modifiedText = <b key={index}>{text}</b>;
			}

			if (obj.italic) {
				modifiedText = <em key={index}>{text}</em>;
			}

			if (obj.underline) {
				modifiedText = <u key={index}>{text}</u>;
			}
		}

		switch (type) {
			case 'heading-three':
				return (
					<h3
						key={index}
						className="text-xl font-semibold mb-4"
					>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>
								{item}
							</React.Fragment>
						))}
					</h3>
				);
			case 'paragraph':
				return (
					<p key={index} className="mb-8">
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>
								{item}
							</React.Fragment>
						))}
					</p>
				);
			case 'heading-four':
				return (
					<h4
						key={index}
						className="text-md font-semibold mb-4"
					>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>
								{item}
							</React.Fragment>
						))}
					</h4>
				);
			case 'image':
				return (
					<img
						key={index}
						alt={obj.title}
						height={obj.height}
						width={obj.width}
						src={obj.src}
					/>
				);
			default:
				return modifiedText;
		}
	};

	return (
		<div className="bg-white shadow-lg rounded-lg pb-12 lg:pb-8 mb-8">
			<div className="relative overflow-hidden shadow-md mb-6">
				<img
					src={post.featuredImage.url}
					alt={post.title}
					className="object-top h-full w-full rounded-t-lg"
				/>
			</div>
			<div className="px-4">
				<div className="flex items-center mb-8 w-full">
					<Author
						author={post.author}
						postDate={post.createdAt}
					/>
				</div>
				<h1 className="mb-8 text-3xl font-semibold">
					{post.title}
				</h1>
				{post.content.raw.children.map(
					(typeObj, index) => {
						const children =
							typeObj.children.map(
								(
									item,
									itemIndex
								) =>
									getContentFragment(
										itemIndex,
										item.text,
										item
									)
							);
						return getContentFragment(
							index,
							children,
							typeObj,
							typeObj.type
						);
					}
				)}
				{/* <div dangerouslySetInnerHTML={{__html: post.content.html}} /> */}
				
			</div>
		</div>
	);
};

export default PostDetail;
