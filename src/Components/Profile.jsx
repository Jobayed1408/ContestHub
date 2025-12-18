import useAuth from "../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-xl mx-auto p-4 rounded-4xl">
            <h1 className="text-2xl font-bold mb-6  text-center">My Profile</h1>

            <div className="border p-10 border-blue-600 text-center rounded-2xl">
                <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-30 h-30 border-2 border-blue-600 rounded-full mx-auto mb-4"
                />

                <h2 className="text-xl font-semibold">{user?.displayName}</h2>
                <p className="">{user?.email}</p>

                
            </div>
        </div>
    );
};

export default Profile;
