import connectDB from "./db";
import {Board, Column} from "./models"

const DEFAULT_CLOUMNS = [
  { name: "Wish List", order: 0,},
  { name: "Applied", order: 2,},
  { name: "Interviewing", order: 3,},
  { name: "Offer", order: 4,},
  { name: "Rejected", order: 5,},
]

export async function initializeUserBoard(userId: string) {
try {
  await connectDB();

 const existingBoard = await Board.findOne({userId, name: "Job Hunt"});

 if(existingBoard) {
  return existingBoard;
 }

 const board = await Board.create({
  name: "Job Hunt",
  userId,
  columns: [],
 });

  // create default column
  const columns = await Promise.all(DEFAULT_CLOUMNS.map((col) => Column.create({
    name: col.name,
    order: col.order,
    boardId: board._id,
    jobApplication: [],
  })
 )
);

// update the board with the new column id
    board.columns = columns.map((col) => col._id);
    await board.save();
    return board;

} catch (err) {
  throw err;
}
}
