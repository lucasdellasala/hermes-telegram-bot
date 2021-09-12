import UserModel, { User } from '../models/User'

export interface SuscribeResponse {
    chatId: string
    isActive: boolean
    name: string
    _id : string
    __v: number
}

export interface SuscribeResponseError {
    message: string
}

class UsersController {

    public async getUsers() {
        const users: User[] = await UserModel.find({ isActive: true})
        
        return users
    }

    public async suscribe(id: string, name: string | undefined) {
        const users: User[] = await UserModel.find({chatId: id, name: name})
        if(users.length === 0) {
            const response = await UserModel.create({chatId: id, isActive: true, name: name})

            return {message: 'You subscribed successfully!', body: response}
        } else {
            return { message: 'User already exists', body: null }
        }

    }

    public async unsuscribe(id: string) {
        const users: User[] = await UserModel.find({chatId: id, isActive: true})
        if(users.length === 0) {
            return {message: 'You are not subscribed.', body: null}
        } else {
            const response = await UserModel.updateOne({chatId: id}, {isActive: false})
            return { message: 'You have successfully unsubscribed!', body: response }
        }

    }

}

export const usersController = new UsersController();