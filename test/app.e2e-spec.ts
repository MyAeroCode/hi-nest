import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                //
                // 데코레이터가 설정되어 있지 않은 프로퍼티는 제거됩니다.
                whitelist: true,

                //
                // 데코레이터가 설정되어 있지 않은 프로퍼티가 전달되면 에러를 발생시킵니다.
                forbidNonWhitelisted: true,

                //
                // url param을 실제 원하는 타입으로 변환합니다.
                transform: true,
            }),
        );
        await app.init();
    });

    describe("/", () => {
        it("GET", () => {
            return request(app.getHttpServer())
                .get("/")
                .expect(200)
                .expect("Hello, World!");
        });
    });

    describe("/movies", () => {
        it("GET", () => {
            return request(app.getHttpServer())
                .get("/movies")
                .expect(200)
                .expect([]);
        });

        it("POST", () => {
            return request(app.getHttpServer())
                .post("/movies")
                .send({
                    title: "Test",
                    year: 2000,
                    genres: ["test"],
                })
                .expect(201);
        });

        it("DELETE", () => {
            return request(app.getHttpServer())
                .delete("/movies")
                .expect(404);
        });
    });

    describe("/movies/:id", () => {
        it("GET", () => {
            return request(app.getHttpServer())
                .get("/movies/1")
                .expect(200);
        });

        it("GET 404", () => {
            return request(app.getHttpServer())
                .get("/movies/999")
                .expect(404);
        });

        it.todo("DELETE");
        it.todo("PATCH");
    });
});
