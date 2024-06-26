import BoardId from "@/app/feed/classes/BoardId";
import { addUserBoard } from "@/store/features/boardsSlice/boardSlice";
import { useAppDispatch } from "@/store/hooks";
import { User } from "@/schemas/UserSchema";
import { TSafeUserSchema } from "@/schemas/safe/SafeUserSchema";
import styles from "@/share/components/UsersPopupList/styles.module.css";
import UserCard from "@/share/ui/UserCard/UserCard";
import { LegacyRef, MouseEventHandler } from "react";

type Props = {
  users: TSafeUserSchema[];
  width?: string;
  maxHeight?: string;
  innerRef?: LegacyRef<HTMLDivElement>;
  onShowAllClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function UsersPopupList({ users, width = "20vw", maxHeight, innerRef, onShowAllClick }: Props) {
  const dispatch = useAppDispatch();

  const handleUserClick = (user: User) => {
    dispatch(addUserBoard({ id: BoardId.id, props: { name: user.name } }));
  };

  return (
    <div ref={innerRef} className={styles.container} style={{ width, maxHeight }}>
      <div className={styles.list}>
        {users.map((user) => {
          return <UserCard key={user.name} user={user} onClick={() => handleUserClick(user)} />;
        })}
      </div>
      <button className={styles.button} onClick={onShowAllClick}>
        Show all
      </button>
    </div>
  );
}
