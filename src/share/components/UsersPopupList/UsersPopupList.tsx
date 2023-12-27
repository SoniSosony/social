import { TSafeUserSchema } from "@/schemas/safe/SafeUserSchema";
import styles from "@/share/components/UsersPopupList/styles.module.css";
import { LegacyRef } from "react";

type Props = {
  users: TSafeUserSchema[];
  width?: string;
  maxHeight?: string;
  innerRef?: LegacyRef<HTMLDivElement>;
};

export default function UsersPopupList({ users, width = "20vw", maxHeight, innerRef }: Props) {
  return (
    <div ref={innerRef} className={styles.container} style={{ width, maxHeight }}>
      <div className={styles.list}>
        <div>
          {users.map((user) => {
            return <div key={user.name}>{user.name}</div>;
          })}
        </div>
      </div>
      <button className={styles.button}>Show all</button>
    </div>
  );
}
