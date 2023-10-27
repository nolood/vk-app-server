import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { EvaluationsModule } from "./evaluations/evaluations.module";
import { Evaluation } from "./evaluations/evaluations.model";
import { MascotModule } from "./mascot/mascot.module";
import { Mascot } from "./mascot/mascot.model";
import { AccessoriesModule } from "./accessories/accessories.module";
import { Accessory } from "./accessories/accessories.model";
import { PlacementsModule } from "./placements/placements.module";
import { Placement } from "./placements/placements.model";
import { MascotAccessory } from "./mascot/mascot-accessories.model";
import { CategoriesModule } from "./categories/categories.module";
import { Category } from "./categories/categories.model";
import { EvaluationCategory } from "./categories/evaluations-categories.model";
import { ConstellationsModule } from "./constellations/constellations.module";
import { UsersConstellations } from "./constellations/users-constellation.model";
import { Constellation } from "./constellations/constellations.model";
import { CriteriaModule } from "./criteria/criteria.module";
import { Criterion } from "./criteria/criteria.model";
import { CommentsModule } from "./comments/comments.module";
import { Comment } from "./comments/comments.model";
import { CodesModule } from "./codes/codes.module";
import { Code } from "./codes/codes.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Evaluation,
        Mascot,
        Accessory,
        Placement,
        MascotAccessory,
        Category,
        EvaluationCategory,
        UsersConstellations,
        Constellation,
        Criterion,
        Comment,
        Code,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    EvaluationsModule,
    MascotModule,
    AccessoriesModule,
    PlacementsModule,
    CategoriesModule,
    ConstellationsModule,
    CriteriaModule,
    CommentsModule,
    CodesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
