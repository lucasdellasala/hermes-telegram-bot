import { 
    Telegraf 
} from 'telegraf'
import colors from 'colors'
import { TELEGRAM_TOKEN } from './keys'
import { usersController } from './controllers/usersController'
import { startMessage, helpMessage } from './messages/help'

const bot = new Telegraf(TELEGRAM_TOKEN)

bot.use((ctx:any, next) => {
    logger(ctx)
    next()
})

bot.start((ctx)=>{
    const name = ctx.update.message.from.first_name? ctx.update.message.from.first_name : ctx.update.message.from.username
    ctx.replyWithHTML(startMessage(name))
})

bot.help((ctx)=>{
    ctx.replyWithHTML(helpMessage)
})

bot.settings((ctx)=>{
    ctx.reply('Settings!')
})

bot.command('test', (ctx) => {
    console.log(ctx.update.message.from)
    ctx.reply('Testing!')
})

bot.command(['suscribe','Suscribe', 'SUSCRIBE', 'subscribe', 'Subscribe', 'SUBSCRIBE'], async (ctx)=>{
    const { id, first_name, username } = ctx.update.message.from
    const name = first_name ? first_name : username
    const response = await usersController.suscribe(id.toString(), name)
    console.log('SUSCRIBE', name, id, response)

    ctx.reply(response.message)
})

bot.command(['unsuscribe','Unsuscribe', 'UNSUSCRIBE', 'unsubscribe', 'Unsubscribe', 'UNSUBSCRIBE'], async (ctx)=>{
    const { id, first_name, username } = ctx.update.message.from
    const name = first_name ? first_name : username
    const response = await usersController.unsuscribe(id.toString())
    console.log('SUSCRIBE', name, id, response)

    ctx.reply(response.message)
})

bot.launch()

const logger = (ctx: BotContext) => {
    const name = ctx.update.message.from.first_name
    const text = ctx.update.message.text
    const date = (new Date(ctx.update.message.date * 1000)).toLocaleString()
    console.info(
        '📩',
        colors.green('Message'),
        colors.yellow(`${date} ${colors.green("||")} ${colors.yellow.underline(`${name}`)} says: ${colors.green(`"${text}"`)}`))
}

interface BotContext {
    update: {
        message: {
            from: {
                first_name: string
            },
            text: string
            date: number
        }
    },
    updateSubTypes: string[]
}