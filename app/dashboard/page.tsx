import KanbanBoard from '@/components/kanban-board';
import { getSession } from '@/lib/auth/auth';
import connectDB from '@/lib/db'
import { Board } from '@/lib/models';

export default async function Dashboard() {
  const session = await getSession();

  await connectDB();

  const board = await Board.findOne({
    userId: session?.user.id,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  return (
  <div>
    <div>
      <h1>{board.name}</h1>
      <p>track your job applications</p>
    </div>
    <KanbanBoard board={JSON.parse(JSON.stringify(board))} userId={session.user.id} />
  </div>
)
}
