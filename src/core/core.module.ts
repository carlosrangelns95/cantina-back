import { Module } from "@nestjs/common";
import { ConnectionModule } from "./connection/connection.module";
import { UserModule } from "../core-modules/user/user.module";
import { ProfileModule } from "../core-modules/profile/profile.module";
import { UploadModule } from "./upload/upload.module";

@Module({
  imports: [
    ConnectionModule,
    UserModule,
    ProfileModule,
    UploadModule,
  ],
  exports: [
    ConnectionModule,
    UserModule,
    ProfileModule,
    UploadModule,
  ],
})
export class CoreModule { }
