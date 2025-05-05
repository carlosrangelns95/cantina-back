import { Module } from '@nestjs/common';
import { ConnectionModule } from './connection/connection.module';
import { UserModule } from '../core-modules/user/user.module';
import { ProfileModule } from '../core-modules/profile/profile.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from 'src/core/auth/auth.module';
import { AdminModule } from 'src/core-modules/admin/admin.module';

@Module({
  imports: [
    ConnectionModule,
    UserModule,
    ProfileModule,
    UploadModule,
    AuthModule,
    AdminModule,
  ],
  exports: [
    ConnectionModule,
    UserModule,
    ProfileModule,
    UploadModule,
    AuthModule,
    AdminModule,
  ],
})
export class CoreModule {}
