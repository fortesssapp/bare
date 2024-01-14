import { Database } from "./Database";

class User extends Database{
    constructor(table ="_users"){
        super(table);
        return this;
    }

    // this finds a single user by any key value pay
    async findUser(key ="phone", value = ""){
        return (await this.collection.where(key, "==", value).limit(1).get()).docs?.[0];
    }

    async getUsers(search = [], after, order, end){
        return await this.read(this.limits, search, after, order, end);
    }


    // this creates a new user
    async createUser(obj = {phone: ""}){
        try {
            const exists = await this.findUser("phone", obj.phone);
            if(exists) return false;
            await this.create(obj);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // this updates a user
    async updateUser(obj = {}, userId = ""){
        const exists = (await this.collection.doc(userId).get())?.data();
        if(!exists) return false;
        return await this.update(obj, userId);
    }


    // this deletes user by ID
    async deleteUser(Id){
        return await this.delete(Id);
    }

}

export const Users = new User();