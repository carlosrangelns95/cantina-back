import { Module } from "@nestjs/common";
import { ConnectionModule } from "./connection/connection.module";
import { UserModule } from "./user/user.module";
import { ProfileModule } from "./profile/profile.module";

@Module({
  imports: [
    ConnectionModule,
    UserModule,
    ProfileModule
  ],
  exports: [
    ConnectionModule,
    UserModule,
    ProfileModule
  ],
})
export class CoreModule { }
