import { Module } from "@nestjs/common";
import { ConnectionModule } from "./connection/connection.module";
import { UserModule } from "../core-modules/user/user.module";
import { ProfileModule } from "../core-modules/profile/profile.module";

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
