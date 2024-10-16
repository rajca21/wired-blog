import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spinner, Table } from 'flowbite-react';
import axios from 'axios';
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { RiChatQuoteLine } from 'react-icons/ri';

import { usePrivilege } from '../../hooks/usePrivilege.hook';

const DashOverview = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAdmin = usePrivilege('admin');

  useEffect(() => {
    const fetchUsers = async () => {
      setError(null);
      try {
        setLoading(true);

        const res = await axios.get(`/api/users?limit=5`);

        if (res.status === 200) {
          setUsers(res.data.users);
          setTotalUsers(res.data.totalUsers);
          setLastMonthUsers(res.data.lastMonthUsers);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong!'
        );
      }
    };

    const fetchPosts = async () => {
      setError(null);
      try {
        setLoading(true);

        const res = await axios.get(`/api/posts?limit=5`);

        if (res.status === 200) {
          setPosts(res.data.posts);
          setTotalPosts(res.data.totalPosts);
          setLastMonthPosts(res.data.lastMonthPosts);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong!'
        );
      }
    };

    const fetchComments = async () => {
      setError(null);
      try {
        setLoading(true);

        const res = await axios.get(`/api/comments?limit=5`);

        if (res.status === 200) {
          setComments(res.data.comments);
          setTotalComments(res.data.totalComments);
          setLastMonthComments(res.data.lastMonthComments);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong!'
        );
      }
    };

    if (isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [isAdmin]);

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center w-full'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex justify-center items-center w-full'>
        <h1 className='text-3xl text-red-500 font-bold'>{error}</h1>
      </div>
    );
  }

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex flex-wrap gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>

        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Comments
              </h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <RiChatQuoteLine className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>

        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiDocumentText className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center mt-5'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Users</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to='/dashboard?tab=users'>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users?.map((user) => (
              <Table.Body key={user._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 h-10 rounded-full bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>

        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Comments</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to='/dashboard?tab=comments'>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>#Likes</Table.HeadCell>
            </Table.Head>
            {comments?.map((comment) => (
              <Table.Body key={comment._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='w-96'>
                    <p className='line-clamp-2'>{comment.content}</p>
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>

        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Posts</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to='/search'>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts?.map((post) => (
              <Table.Body key={post._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-14 h-10 rounded-md bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell className='w-96'>{post.title}</Table.Cell>
                  <Table.Cell className='w-5'>
                    {post.category?.name || 'Uncategorized'}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashOverview;
