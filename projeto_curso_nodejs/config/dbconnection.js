const { Client } = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://woowfpdcovzmkm:d1ef33cbfee5c9f20221c8502f4de1280aff1cb93996e4f74dfb5a515049e08b@ec2-52-200-68-5.compute-1.amazonaws.com:5432/d6aq88n1h3l20c',
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

module.exports = client