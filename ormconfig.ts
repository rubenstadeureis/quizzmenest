import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const config: TypeOrmModuleOptions[] = [
  {
    name: 'default',
    type: 'mariadb',
    host: 'mariadb',
    port: 3306,
    username: 'root',
    password: 'mariadbpw',
    database: 'quizzme',
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
    entities: [__dirname + '/src/**/*.entity.{js,ts}'],
    migrations: [__dirname + '/src/infra/typeorm/migrations/*.ts'],
    timezone: '+03:00',
  },
];

export default config;
