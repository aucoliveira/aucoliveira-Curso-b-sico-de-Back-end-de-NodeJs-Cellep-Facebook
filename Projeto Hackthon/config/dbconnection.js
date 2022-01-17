const { Client } = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://hyvmdzsmxkkpop:0df3829c9a0dcc1b8ff3e7073e49865bff17dd2f2da0380f2bd798d0455f97fd@ec2-3-212-168-103.compute-1.amazonaws.com:5432/db54p7ah9vvfbp',
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

module.exports = client