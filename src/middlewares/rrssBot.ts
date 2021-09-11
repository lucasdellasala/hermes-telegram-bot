import { Telegram } from 'telegraf'
import { TELEGRAM_TOKEN } from '../keys'

const rrssBot = (chatId: number, body: RrssBody) => {
    const bot = new Telegram(TELEGRAM_TOKEN)
    const { title, description, link, category } = body

    const message = `<em>⚽${category}⚽</em>\n<strong>${title}</strong>\n\n${description}\n\n<em>Seguí leyendo en:</em>👉 ${link}`
    
    bot.sendMessage(chatId, message, { parse_mode: 'HTML'})
    
}

interface RrssBody {
    title: string
    description: string
    link: string
    category: string
}

export default rrssBot