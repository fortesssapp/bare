import { Database } from "./Database";

class File extends Database {
  constructor(table = "_files") {
    super(table);
    return this;
  }

  // this finds a single user by any key value pay
  async findFile(key = "name", value = "") {
    return (await this.collection.where(key, "==", value).limit(1).get())
      .docs?.[0];
  }

  async getFiles(search = [], after, order, end) {
    return await this.read(this.limits, search, after, order, end);
  }

  // this creates a new user
  async createFile(obj = { user_id: "" }) {
    try {
      const exists = await this.findFile("name", obj.name);
      if (exists) return false;
      await this.create(obj);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // this updates a user
  async updateFile(obj = {}, fileId = "") {
    const exists = (await this.collection.doc(fileId).get())?.data();
    if (!exists) return false;
    return await this.update(obj, fileId);
  }

  // this deletes user by ID
  async deleteFile(Id) {
    return await this.delete(Id);
  }
}

export const Files = new File();
