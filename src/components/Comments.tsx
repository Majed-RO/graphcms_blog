import * as React from 'react';
import { useState, useEffect } from 'react';

import moment from 'moment';
import parse from 'html-react-parser'
import { sdkClient } from '../clients/graphql-request';
import { Comment } from '../generated/graphql';

const CommentsForm = ({slug} : {slug: string}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    sdkClient.GetComments({slug}).then(result => {
       setComments(result.comments);
    })
  }, []);

  return (
    <>
    {comments.length > 0  && (
      <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {comments.length}
        {' '}
        Comments
      </h3>
        {comments.map((comment: Comment) => (
          <div className='border-b border-gray-100 mb-4 pb-4 text-base' key={comment.createdAt} >
            <p className='mb-4'>
              <span className='font-semibold'>
                {comment.name}
              </span> {' '}
              On 
              {' '} {moment(comment.createdAt).format('MMM DD, YYYY')}
            </p>
            <p className='whitespace-pre-line text-gray-500 w-full'>{parse(comment.comment)}

            </p>
          </div>
        ))}
    </div>
    )}
    </>
  );
}

export default CommentsForm;