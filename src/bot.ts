import { 
//    Context,
    Telegraf 
} from 'telegraf'
import colors from 'colors'
import { TELEGRAM_TOKEN } from './keys'

const bot = new Telegraf(TELEGRAM_TOKEN)

bot.use((ctx:any, next) => {
    logger(ctx)
    next()
})

bot.start((ctx)=>{
    const name = ctx.update.message.from.first_name
    console.log(`${name} started the bot`)
    ctx.reply(`Hi ${name}! Welcome to Hermes, your news app`)
})

bot.help((ctx)=>{
    ctx.reply('Help!')
})

bot.settings((ctx)=>{
    ctx.reply('Settings!')
})

bot.command('test', (ctx) => {
    console.log(ctx)
    ctx.reply('Testing!')
})

// TODO :
// - Agregar comando para suscribirse - tiene que desactivar en mongoDb el field isActive
// - Agregar comando para desuscribirse - tiene que activar en mongoDb el field isActive

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