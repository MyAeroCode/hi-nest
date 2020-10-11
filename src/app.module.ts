import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
    imports: [MoviesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
