import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sdkClient } from '../clients/graphql-request';
import {
	GetCategoriesQuery,
} from '../generated/graphql';

const Header = () => {
	const [categories, setCategories] = useState<GetCategoriesQuery>();

	useEffect(() => {
		sdkClient.GetCategories().then(newCategories => {
			setCategories(newCategories);
		});
	}, []);

	return (
		<div className="container mx-auto mb-8 px-10 ">
			<div className="border-b w-full inline-block border-blue-400 py-8">
				<div className="md:float-left block">
					<Link href="/">
						<span className="cursor-pointer font-bold text-4xl text-white">
							GraphCMS
						</span>
					</Link>
				</div>
				<div className="hidden  md:contents">
					{categories &&
						categories.categories.map(
							category => {
								return (
									<Link
										key={
											category.slug
										}
										href={`/category/${category.slug}`}
									>
										<span className="md:float-right mt-2 align-middle text-white ml-4 cursor-pointer hover:border-b">
											{
												category.name
											}
										</span>
									</Link>
								);
							}
						)}
				</div>
			</div>
		</div>
	);
};

export default Header;
