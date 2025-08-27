import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { approveAdRoute, deleteAdRoute, getAllAdsRoute } from '../utils/ApiRoutes';
import axios from 'axios';

export default function AdminAd() {
    const { currentUser } = useSelector((state) => state.user);
    const [ads, setAds] = useState([]);


  useEffect(() => {
    const fetchAds = async () => {
      try {
        const config = {
          headers: {
              'Content-Type': 'application/json'
          },
          withCredentials: true
        }
        const response = await axios.get(`${getAllAdsRoute}`, config);
        console.log(response);
        setAds(response.data);
      } catch (error) {
        console.log('Failed to load queries: ', error);
      }
    };
    fetchAds();
  }, []);

  const handleApproval = async (postId) => {
    try {
      const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
      }
      const response = await axios.put(`${approveAdRoute}/${postId}`, config);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
      }
      const response = await axios.delete(`${deleteAdRoute}/${postId}`, config);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    (currentUser && currentUser.admin) ? 
    <div>
      <div className='flex items-center justify-center py-8 text-3xl font-extrabold text-white bg-blue-500'>
        Admin Panel
      </div>
      <div className='w-full flex flex-col justify-center items-center gap-6 mt-12'>
        <div className='w-[90%] flex justify-between items-center'>
          <span className='font-medium text-2xl text-gray-700'>Ads</span>
        </div>
        <div className="w-[90%] overflow-x-auto rounded shadow-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-purple-500 text-white text-center">Posted By</th>
                <th className="w-[25%] py-2 px-4 bg-purple-500 text-white text-center">Content</th>
                <th className=" py-2 px-4 bg-purple-500 text-white text-center">Topics</th>
                <th className="py-2 px-4 bg-purple-500 text-white text-center">Created At</th>
                <th className="py-2 px-4 bg-purple-500 text-white text-center">Approval</th>
                <th className="py-2 px-4 bg-purple-500 text-white text-center">Booked to</th>
                <th className="py-2 px-4 bg-purple-500 text-white text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads?.length > 0 ? (
                ads.map((post, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 border-r-2 text-center">{post.userId.name}</td>
                    <td className="w-[25%] py-2 px-4 border-r-2 text-center">{post.content}</td>
                    <td className=" py-2 px-4 border-r-2 text-center">
                        {post.topics.map((topic, i) => (
                            <p>{topic}</p>
                        ))}
                    </td>
                    <td className="py-2 px-4 border-r-2 text-center">{post.createdAt}</td>
                    <td className="py-2 px-4 border-r-2 text-center">{post.accepted ? 'Yes': 'No'}</td>
                    <td className="py-2 px-4 border-r-2 text-center">{post.booked ? post.booked.name: 'None'}</td>
                    <td  className=' py-2 flex flex-col items-center gap-1'>
                      <button 
                        onClick={() => handleApproval(post._id)} 
                        className={`bg-green-500 text-white px-2 py-1 rounded ${post.accepted ? "opacity-60 cursor-not-allowed":""}`}
                        disabled = {post.accepted}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleDelete(post._id)}
                        className={`bg-red-700 text-white px-2 py-1 rounded`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 text-center" colSpan="6">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>:<div>
      Access Denied
    </div>
  )
}
