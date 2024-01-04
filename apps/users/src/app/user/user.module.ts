import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { USER } from '../common/models/models';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
          name: USER.name, 
          useFactory: () => {
            return UserSchema;
          }
        }])
      ],
    controllers: [UserController],
    providers: [UserService],
})
export class UsersModule {}
