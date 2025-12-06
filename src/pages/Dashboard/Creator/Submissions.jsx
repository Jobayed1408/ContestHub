// SubmittedTasks.jsx
import { useParams } from "react-router";

const Submissions = () => {
  const { contestId } = useParams();

  const submissions = [
    {
      id: "s1",
      name: "Rahim",
      email: "rahim@gmail.com",
      task: "My design is simple and modern.",
    },
    {
      id: "s2",
      name: "Karim",
      email: "karim@gmail.com",
      task: "I used blue & black theme.",
    },
  ];

  const declareWinner = (id) => {
    console.log("Winner selected:", id);
    // PATCH API call
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">
        Submissions for Contest #{contestId}
      </h3>

      {submissions.map((s) => (
        <div key={s.id} className="p-4 border rounded mb-4">
          <p><b>Name:</b> {s.name}</p>
          <p><b>Email:</b> {s.email}</p>
          <p className="mt-2"><b>Task:</b> {s.task}</p>

          <button
            onClick={() => declareWinner(s.id)}
            className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
          >
            Declare Winner
          </button>
        </div>
      ))}
    </div>
  );
};

export default Submissions;
