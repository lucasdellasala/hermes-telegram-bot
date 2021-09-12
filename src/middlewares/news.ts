import { usersController } from './../controllers/usersController'

const news = async (req:any,res:any, rrssBot: any) => {
    // Esto tiene que ser la lista de usuarios suscriptos consultada al cliente de mongodb
    const users = await usersController.getUsers()

    users.forEach(user => rrssBot(user.chatId, req.body))
    
    res.send(users)
}

export default news