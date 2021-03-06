export default {
  db: {
    sequelize: {
      database: process.env.DB_DATABASE || 'bible',
      username: process.env.DB_USERNAME || 'username',
      password: process.env.DB_PASSWORD || 'password',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306)
    },
    mongoose: {
      url: process.env.MONGO_URI || 'mongodb://username:password@127.0.0.1:13307/bible'
    },
    redis: {
      cache: {
        port: Number(process.env.REDIS_CACHE_PORT || 6379)
      },
      messageQueue: {
        port: Number(process.env.REDIS_MQ_PORT || 6380)
      }
    }
  },
  log: {
    cronRule: process.env.LOG_CRON_RULE || '*/1 * * * *'
  }
};
