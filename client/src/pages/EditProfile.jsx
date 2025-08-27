import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import profile from '../assets/userProfile.png';
import { CircularProgressbar } from 'react-circular-progressbar';
import axios from 'axios';
import { updateFailure, updateStart, updateSuccess } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { updateUserRoute } from '../utils/ApiRoutes';
import { supabase } from '../supabase';

const initialTopics = [
    { subName: 'Bangla', isSelected: false },  
    { subName: 'English', isSelected: false },  
    { subName: 'Mathematics', isSelected: false },  
    { subName: 'Bangladesh and Global Studies', isSelected: false },  
    { subName: 'Religion and Moral Education', isSelected: false },  
    { subName: 'Science', isSelected: false },  
    { subName: 'ICT', isSelected: false },  
    { subName: 'Agriculture Studies', isSelected: false },  
    { subName: 'Home Science', isSelected: false },  
    { subName: 'Physical Education & Health', isSelected: false },  
    { subName: 'Arts and Crafts', isSelected: false },
    { subName: 'Physics', isSelected: false },  
    { subName: 'Chemistry', isSelected: false },  
    { subName: 'Biology', isSelected: false },  
    { subName: 'Higher Mathematics', isSelected: false },  
    { subName: 'Geography and Environment', isSelected: false },  
    { subName: 'Civics and Citizenship', isSelected: false },  
    { subName: 'Economics', isSelected: false },  
    { subName: 'English Language', isSelected: false },  
    { subName: 'English Literature', isSelected: false },  
    { subName: 'Mathematics', isSelected: false },  
    { subName: 'Additional Mathematics', isSelected: false },  
    { subName: 'Physics', isSelected: false },  
    { subName: 'Chemistry', isSelected: false },  
    { subName: 'Biology', isSelected: false },  
    { subName: 'Accounting', isSelected: false },  
    { subName: 'Business Studies', isSelected: false },  
    { subName: 'Economics', isSelected: false },  
    { subName: 'Geography', isSelected: false },  
    { subName: 'History', isSelected: false },  
    { subName: 'Sociology', isSelected: false },  
    { subName: 'Psychology', isSelected: false },  
    { subName: 'Computer Science', isSelected: false },  
    { subName: 'Art and Design', isSelected: false },  
    { subName: 'Law', isSelected: false },  
    { subName: 'Media Studies', isSelected: false }  
];

export default function EditProfile() {
    const { currentUser } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({ selectedTopics: [] });
    const [form, setForm] = useState({});
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [citycng, setCitycng] = useState(false);
    const [phonecng, setPhonecng] = useState(false);
    const [topicChange, setTopicChange] = useState(false);

    const [topics, setTopics] = useState(initialTopics);

    const filePickerRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (imageFile) {
            handleFileUpload();
        }
    }, [imageFile]);

    useEffect(() => {
        if (currentUser && currentUser.interestedTopics) {
            const updatedTopics = initialTopics.filter(
                (topic) => !currentUser.interestedTopics.includes(topic.subName)
            );
            setFormData((prev) => ({
                ...prev,
                selectedTopics: currentUser.interestedTopics,
            }));
            setTopics(updatedTopics);
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    const handleFileUpload = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const fileName = `${Date.now()}_${imageFile.name}`;

        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from('img_bkt')
            .createSignedUploadUrl(fileName);

        if (signedUrlError) {
            console.log('Failed to get signed URL:', signedUrlError.message);
            setImageFileUploadError(
                'Could not upload image'
            );
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
            setImageFileUploading(false);
            return;
        }

        const uploadUrl = signedUrlData?.signedUrl;

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl, true);
        xhr.setRequestHeader('Content-Type', imageFile.type);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setImageFileUploadProgress(percent);
            }
        };

        xhr.onload = async () => {
            if (xhr.status === 200) {
                const { data: urlData } = supabase.storage
                    .from('img_bkt')
                    .getPublicUrl(fileName);

                const publicUrl = urlData?.publicUrl;
                setImageFileUrl(publicUrl);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    profile: publicUrl,
                }));
                setImageFileUploading(false);
            } else {
                console.log("Upload failed with status:", xhr.status);
                setImageFileUploadError(
                'Could not upload image'
                );
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            }
        };

        xhr.onerror = () => {
            console.error("XHR upload error");
            setImageFileUploadError(
                'Could not upload image'
            );
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
            setImageFileUploading(false);
        };

        xhr.send(imageFile);
    } ;

    const handleTopicSelect = (topic) => {
        if (formData?.selectedTopics?.length > 5) {
            toast.error('You can select up to 5 topics only.');
        }
        setFormData((prev) => ({
            ...prev,
            selectedTopics: [...prev.selectedTopics, topic.subName],
        }));
        setTopics((prev) => prev.filter((t) => t.subName !== topic.subName));
    };

    const handleTopicRemove = (topic) => {
        setFormData((prev) => ({
            ...prev,
            selectedTopics: prev.selectedTopics.filter(
                (t) => t !== topic
            ),
        }));
        const tp = initialTopics.find((t) => t.subName === topic);
        setTopics((prev) => [...prev, tp]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateStart());

        let form = {};
        if (formData.profile) {
            form = {
                row: "profile",
                data: formData.profile,
            };
        } else if (formData.currentCity && citycng) {
            form = {
                row: "currentCity",
                data: formData.currentCity,
            };
        } else if (formData.contactNumber && phonecng) {
            form = {
                row: "phone",
                data: formData.contactNumber,
            };
        } else if (formData.selectedTopics && topicChange) {
            form = {
                row: "interestedTopics",
                data: formData.selectedTopics,
            };
        }

        if (!form.row || !form.data) {
            toast.error("No data to update.");
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            const res = await axios.post(updateUserRoute, form, config);
            const data = res.data;
            dispatch(updateSuccess(data));
            setFormData({});
            setCitycng(false);
            setPhonecng(false);
            setTopicChange(false);
            toast.success("User Updated Successfully!");
        } catch (error) {
            dispatch(updateFailure());
            toast.error(error.response?.data?.message || "Failed to update user.");
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full flex flex-col items-center'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Edit Profile</h1>

            {/* Profile Picture */}
            <form className='flex flex-col gap-4 p-6' onSubmit={handleSubmit}>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />
                <div
                    className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                    onClick={() => filePickerRef.current.click()}
                >
                    {imageFileUploadProgress && (
                        <CircularProgressbar
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                                },
                            }}
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profile || profile}
                        alt='user'
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                            imageFileUploadProgress &&
                            imageFileUploadProgress < 100 &&
                            'opacity-60'
                        }`}
                    />
                </div>
                <div className='flex justify-center'>
                    <button className='bg-blue-600 w-40 rounded-md text-white font-medium' type='submit'>
                        Upload
                    </button>
                </div>
            </form>

            <div className=' w-[100px] px-1 py-[2px] bg-green-500 text-center rounded text-md text-white font-medium'>
                {currentUser?.userType}
            </div>

            {/* City */}
            <div className=' w-full flex justify-between p-2'>
                <h3>Current City: {currentUser.currentCity || 'N/A'}</h3>
                {!citycng && (
                    <button className='bg-blue-600 rounded-md px-2 py-1 text-white font-medium' onClick={() => setCitycng(true)}>
                        Change
                    </button>
                )}
            </div>
            {citycng && (
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        id='currentCity'
                        placeholder='Your Current City...'
                        defaultValue={currentUser.currentCity}
                        onChange={handleChange}
                        required
                        className='my-2 w-full border border-gray-400 px-2 py-1 rounded-md'
                    />
                    <div className='flex justify-between p-2'>
                        <button className='bg-red-500 rounded-md px-2 py-1 text-white font-medium' onClick={() => setCitycng(false)}>
                            Cancel
                        </button>
                        <button className='bg-blue-600 rounded-md px-2 py-1 text-white font-medium' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            )}

            {/* Phone */}
            <div className=' w-full flex justify-between p-2'>
                <h3>Contact Number: {currentUser.phone || 'N/A'}</h3>
                {!phonecng && (
                    <button className='bg-blue-600 rounded-md px-2 py-1 text-white font-medium' onClick={() => setPhonecng(true)}>
                        Change
                    </button>
                )}
            </div>
            {phonecng && (
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        id='contactNumber'
                        placeholder='Your Contact Number...'
                        defaultValue={currentUser.phone}
                        onChange={handleChange}
                        required
                        className='my-2 w-full border border-gray-400 px-2 py-1 rounded-md'
                    />
                    <div className='flex justify-between p-2'>
                        <button className='bg-red-500 rounded-md px-2 py-1 text-white font-medium' onClick={() => setPhonecng(false)}>
                            Cancel
                        </button>
                        <button className='bg-blue-600 rounded-md px-2 py-1 text-white font-medium' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            )}

            {/* Interested Topics (Only for Tutors) */}
            {currentUser.userType === "tutor" && (
                <div className=' w-full flex flex-col gap-4'>
                    <div className='w-full px-2 flex flex-wrap gap-2'>
                        <h1 className='font-medium'>Interested Topics:</h1>
                        {currentUser?.interestedTopics ? (
                            currentUser.interestedTopics.map((topic, index) => {
                                return (
                                    <div key={index}>
                                        {topic}
                                        {currentUser.interestedTopics.length - 1 === index ? "." : ", "}
                                    </div>
                                );
                            })
                        ) : (
                            <div>N/A</div>
                        )}
                    </div>
                    <div className='flex justify-center'>
                        {!topicChange && (
                            <button className='bg-blue-600 rounded-md px-2 py-1 text-white font-medium' onClick={() => setTopicChange(true)}>
                                Change
                            </button>
                        )}
                    </div>

                    {topicChange && (
                        <div className='flex flex-col w-full'>
                            <div className='w-full rounded-md flex gap-2'>
                                {/* Selected Topics */}
                                <div className="flex flex-wrap gap-2 w-3/4 bg-gray-200 rounded-md justify-center items-center py-2">
                                    {formData?.selectedTopics?.map((topic) => (
                                        <div
                                            key={topic}
                                            className="bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center gap-2"
                                        >
                                            <span>{topic}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleTopicRemove(topic)}
                                                className="text-sm text-white hover:text-red-500"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Dropdown */}
                                <div className="w-1/4 relative group flex justify-center items-center">
                                    <select
                                        className={`w-full bg-gray-200 border border-gray-400 rounded-lg p-2 outline-none dark:bg-gray-800 dark:text-gray-200 ${
                                            formData?.selectedTopics?.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        onChange={(e) => {
                                            const selectedTopic = topics.find(
                                                (t) => t.subName === e.target.value
                                            );
                                            if (selectedTopic) handleTopicSelect(selectedTopic);
                                        }}
                                        defaultValue=""
                                        disabled={formData?.selectedTopics?.length >= 5}
                                    >
                                        <option value="">Select Topics</option>
                                        {topics?.map((topic) => (
                                            <option key={topic.subName} value={topic.subName}>
                                                {topic.subName}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Tooltip */}
                                    {formData?.selectedTopics?.length >= 5 && (
                                        <div className="absolute top-full left-0 mt-1 bg-gray-700 text-white text-sm rounded px-2 py-1 shadow-lg hidden group-hover:block">
                                            You can select at most 5 topics
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className='py-4 px-12 flex justify-between'>
                                <button className='bg-red-500 rounded-md px-2 py-1 text-white font-medium' onClick={() => setTopicChange(false)}>
                                    Cancel
                                </button>
                                <button
                                    className='bg-blue-600 rounded-md px-2 py-1 text-white font-medium'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}