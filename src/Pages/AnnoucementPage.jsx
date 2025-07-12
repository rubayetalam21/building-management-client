import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useUserRole from '../hooks/useUserRole'; // Make sure this hook is implemented

const AnnouncementPage = () => {
    const { role, isLoading: roleLoading } = useUserRole();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [announcements, setAnnouncements] = useState([]);

    // Fetch announcements
    const fetchAnnouncements = async () => {
        const res = await fetch('http://localhost:5000/announcements');
        const data = await res.json();
        setAnnouncements(data);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // Handle admin-only announcement creation
    const handleSubmit = async (e) => {
        e.preventDefault();

        const announcement = {
            title,
            description,
            createdBy: 'Admin',
        };

        const res = await fetch('http://localhost:5000/announcements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(announcement),
        });

        if (res.ok) {
            Swal.fire('Success', 'Announcement posted', 'success');
            setTitle('');
            setDescription('');
            fetchAnnouncements(); // refresh announcements
        } else {
            Swal.fire('Error', 'Failed to post announcement', 'error');
        }
    };

    if (roleLoading) {
        return <p>Loading role...</p>;
    }

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
