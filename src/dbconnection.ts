import mongoose from 'mongoose'

import { mongodb } from './keys'

(async()=>{
    try {
        await mongoose.connect(mongodb.URI, ()=>{console.log('DB is connected')})
    } catch(err) {
        console.info("---Error at src/dbconnection.ts")
        console.error(err)
    }
})()

