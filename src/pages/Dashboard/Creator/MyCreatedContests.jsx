// MyCreatedContests.jsx
import { Link } from "react-router";

const MyCreatedContests = () => {

  

  const contests = [
    { id: 1, name: "Logo Design", status: "Pending" },
    { id: 2, name: "Photography", status: "Confirmed" },
    { id: 3, name: "Writing", status: "Rejected" },
  ];

  const handleDelete = (id) => {
    console.log("Delete contest:", id);
    // DELETE API here
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">My Created Contests</h3>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Submissions</th>
          </tr>
        </thead>

        <tbody>
          {contests.map((c) => (
            <tr key={c.id} className="border">
              <td>{c.name}</td>
              <td>{c.status}</td>

              <td className="space-x-2">
                {c.status === "Pending" && (
                  <>
                    <Link to={`/dashboard/creator/edit/${c.id}`}>
                      <button className="btn">Edit</button>
                    </Link>

                    <button onClick={() => handleDelete(c.id)} className="btn">
                      Delete
                    </button>
                  </>
                )}
              </td>

              <td>
                <Link to={`/dashboard/creator/submissions/${c.id}`}>
                  <button className="btn">See Submissions</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCreatedContests;
