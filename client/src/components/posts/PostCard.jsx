import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className='group relative w-full border border-purple-500 hover:border-2 h-[270px] overflow-hidden rounded-lg sm:w-[365px] transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post-cover'
          className='h-[160px] w-full object-cover group-hover:h-[100px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>
          {post.category?.name || 'Uncategorized'}
        </span>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-100px] left-0 right-0 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
