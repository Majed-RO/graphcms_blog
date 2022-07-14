import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sdkClient } from '../clients/graphql-request';
import {  GetCategoriesQuery } from '../generated/graphql';

const Categories = () => {
	const [categories, setCategories] = useState<GetCategoriesQuery>();

	useEffect(() => {
		sdkClient.GetCategories().then(newCategories => {
			setCategories(newCategories);
		});
	}, []);

	return (
		<div className="bg-white p-8 mb-8 shadow-lg rounded-lg pb-12">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				Categories
			</h3>
			{categories &&
				categories.categories.map(category => (
					<Link
						href={`/category/${category.slug}`}
						key={category.slug}
					>
						<a className="cursor-pointer block pb-3 mb-3">
							{category.name}
						</a>
					</Link>
				))}
		</div>
	);
};

export default Categories;
