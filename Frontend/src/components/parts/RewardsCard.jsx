import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const RewardsCard = () => {
    const topUsers = [
        { id: 1, name: "John Doe", points: 1500 },
        { id: 2, name: "Jane Smith", points: 1450 },
        { id: 3, name: "Emily Johnson", points: 1400 },
        { id: 4, name: "Michael Brown", points: 1380 },
        { id: 5, name: "Sarah Williams", points: 1350 },
        { id: 6, name: "David Miller", points: 1320 },
        { id: 7, name: "Sophia Wilson", points: 1300 },
        { id: 8, name: "James Davis", points: 1280 },
        { id: 9, name: "Olivia Garcia", points: 1250 },
        { id: 10, name: "Isabella Martinez", points: 1200 },
    ];

    return (
        <div className="bg-[#1f1f1f] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Top 10 Contributers</h2>
            <p className="text-gray-400 mb-6">Here are the top users with the most upvote points for sharing their travel experiences:</p>

            <ul className="space-y-4">
                {topUsers.map((user, index) => (
                    <li
                        key={user.id}
                        className="flex justify-between items-center bg-[#292929] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex items-center">
                            <span className="text-lg font-bold text-white mr-4">{index + 1} </span>
                            <span className="text-white font-medium">{user.name}</span>
                        </div>
                        <div className="text-sm text-gray-400">{user.points} points</div>
                    </li>
                ))}
            </ul>

            <Link to="/rewards" className="text-blue-500 hover:underline mt-6 block">View All Rewards</Link>
        </div>
    );
};

export default RewardsCard;
