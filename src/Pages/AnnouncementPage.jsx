import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import useUserRole from '../hooks/useUserRole';
import { AuthContext } from '../Provider/AuthProvider';

const AnnouncementPage = () => {
    const { user } = useContext(AuthContext);
    const { role, isLoading: roleLoading } = useUserRole();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [announcements, setAnnouncements] = useState([]);

    // Fetch announcements with token
    const fetchAnnouncements = async () => {
        try {
            const token = user && (await user.getIdToken());

            const res = await fetch('https://b11a12-server-side-rubayetalam21.vercel.app/announcements', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (Array.isArray(data)) {
                setAnnouncements(data);
            } else {
                console.error('Expected announcements array but got:', data);
                setAnnouncements([]);
            }
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
            setAnnouncements([]);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAnnouncements();
        }
    }, [user]);

    // Submit new announcement (admin only)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const announcement = {
            title,
            description,
            createdBy: 'Admin',
        };

        try {
            const token = await user.getIdToken();

            const res = await fetch('https://b11a12-server-side-rubayetalam21.vercel.app/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(announcement),
            });

            if (res.ok) {
                Swal.fire('Success', 'Announcement posted', 'success');
                setTitle('');
                setDescription('');
                fetchAnnouncements();
            } else {
                Swal.fire('Error', 'Failed to post announcement', 'error');
            }
        } catch (err) {
            console.error('Failed to submit announcement:', err);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    if (roleLoading) return <p>Loading role...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-6">📢 Announcements</h2>

            {role === 'admin' && (
                <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6 space-y-3">
                    <input
                        type="text"
                        placeholder="Announcement Title"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Announcement Description"
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" className="btn btn-primary">Post Announcement</button>
                </form>
            )}

            <div className="space-y-4">
                {announcements.length === 0 ? (
                    <p className="text-gray-600">No announcements yet.</p>
                ) : (
                    announcements.map((a) => (
                        <div key={a._id} className="bg-gray-100 p-4 rounded shadow">
                            <h3 className="text-lg font-semibold text-gray-800">{a.title}</h3>
                            <p className="text-gray-700">{a.description}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Posted by {a.createdBy} on {new Date(a.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AnnouncementPage;
