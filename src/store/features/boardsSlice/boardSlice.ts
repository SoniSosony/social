import { PeoplePayload } from "@/app/feed/boards/People/People";
import { UserPayload } from "@/app/feed/boards/User/User";
import { BoardName } from "@/app/feed/enums/BoardName";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PeoplePayloadAction = { name: BoardName.people; id: number; props: PeoplePayload; headerChildren?: JSX.Element };
type PeopleUserAction = { name: BoardName.user; id: number; props: UserPayload; headerChildren?: JSX.Element };

interface BoardsSlice {
  [BoardName.people]: PeoplePayloadAction[];
  [BoardName.user]: PeopleUserAction[];
}

const initialState: BoardsSlice = {
  people: [],
  user: [],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addFriendsBoard(state, action: PayloadAction<Omit<PeoplePayloadAction, "name">>) {
      state[BoardName.people].push({ ...action.payload, name: BoardName.people });
    },
    addUserBoard(state, action: PayloadAction<Omit<PeopleUserAction, "name">>) {
      state[BoardName.user].push({ ...action.payload, name: BoardName.user });
    },
    removeBoard(state, action: PayloadAction<{ name: BoardName; id: number }>) {
      if (BoardName.people) {
        const boards = state[action.payload.name];
        const index = boards.findIndex((board) => board.id === action.payload.id);
        // @ts-ignore
        state[action.payload.name] = [...boards.slice(0, index), ...boards.slice(index + 1)];
      }
    },
  },
});

export const { addFriendsBoard, addUserBoard, removeBoard } = boardsSlice.actions;
export const boards = boardsSlice.reducer;