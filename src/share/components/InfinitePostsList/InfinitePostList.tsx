import { PostArraySchema } from "@/schemas/PostSchema";
import { postService } from "@/services/postService";
import InfiniteList from "@/share/components/InfiniteList/InfiniteList";
import { memo, useEffect, useState } from "react";
import InfiniteDataManager from "@share/classes/InfiniteDataManager";
import { z } from "zod";
import Post from "@share/components/Post/Post";
import { Post as TPost } from "@schemas/PostSchema";
import { PostRowsOptions } from "@share/types/PostRowsOptions";

export type Props = { name?: string };

const getService = (name: string | undefined) => {
  if (name) return (page: number, limit: number) => postService.get(name, page, limit);
  return postService.getFriends;
};

export default memo(function InfinitePostsList({ name }: Props) {
  const [data, setData] = useState<z.infer<typeof PostArraySchema>>([]);
  const [dataManager, setDataManager] = useState<InfiniteDataManager<typeof PostArraySchema>>();

  useEffect(() => {
    const service = getService(name);
    const manager = new InfiniteDataManager<typeof PostArraySchema>({
      service,
      schema: PostArraySchema,
      newDataOnTop: (data) => {
        setData([...data]);
      },
      newDataOnEnd: (data) => setData([...data]),
    });
    manager.fetchEnd();
    setDataManager(manager);
  }, [name]);

  return (
    <InfiniteList<TPost, PostRowsOptions>
      data={data || []}
      rowsOptions={{ delete: false }}
      component={Post}
      onEndReached={dataManager?.fetchEnd}
    />
  );
});