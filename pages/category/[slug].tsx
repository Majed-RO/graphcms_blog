import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { useRouter } from 'next/router';


import { PostCard, Categories, Loader } from '../../src/components'
import {  PostEdge } from '../../src/generated/graphql';
import { sdkClient } from '../../src/clients/graphql-request';

const CategoryPost = ({ posts } : {posts: PostEdge[]}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {

  const posts = await sdkClient.GetCategoryPosts({slug: params.slug as string});
  return {
    props: { posts: posts.postsConnection.edges },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await sdkClient.GetCategories();
  return {
    paths: categories.categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}