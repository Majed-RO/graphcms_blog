import moment from 'moment';
import { Author } from '../generated/graphql';

const PostMeta = ({ author, postDate } : {author: Author , postDate: Date}) => {
	return (
		<>
			<div className="flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8">
				<img
					src={author?.photo?.url}
					alt={author?.name}
					className="align-middle object-cover rounded-full h-8 w-8"
				/>
				<p className="inline align-middle text-gray-700 ml-2 text-lg">
					{author?.name}
				</p>
			</div>
			<div className="font-medium text-gray-700">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 inline mr-2 text-pink-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<span className="">
					{moment(postDate).format(
						'MMM DD, YYYY'
					)}
				</span>
			</div>
		</>
	);
};

export default PostMeta;
