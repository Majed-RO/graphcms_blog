import Image from 'next/image';
import { Author } from '../generated/graphql';

const Author = ({ author }: { author: Author }) => {
	return (
		<div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20 ">
			<div className="absolute left-0 right-0 -top-14">
				<Image
					src={author?.photo?.url!}
          unoptimized
					alt={author.name}
          width="110px"
          height="110px"
					className="align-middle rounded-full object-cover"
				/>
			</div>
			<h3 className="text-white my-4 text-xl font-bold">
				{author.name}
			</h3>
			<p className="text-white text-lg">{author.bio}</p>
		</div>
	);
};

export default Author;
