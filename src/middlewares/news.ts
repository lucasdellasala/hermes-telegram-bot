const news = (req:any,res:any, rrssBot: any) => {
    // Esto tiene que ser la lista de usuarios suscriptos consultada al cliente de mongodb
    const users = [1135051130, 1135051130]

    users.forEach(user => rrssBot(user, req.body))

    res.send('news')
}

export default news