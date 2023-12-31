import User from "@/models/userModel";
import { processError } from "@/share/api/helpers/processError";

export async function dbGet(input: string, page: number, limit: number = 30) {
  try {
    page = page - 1 || 0;
    return await User.find({ name: new RegExp("\\b" + input + "\\w*", "gi") })
      .skip(2 * page)
      .limit(limit);
  } catch (error) {
    return processError(error);
  }
}
