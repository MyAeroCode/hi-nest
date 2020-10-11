import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("getAll()", () => {
        it("should return an array", () => {
            const result = service.getAll();
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe("getOne()", () => {
        it("should return a movie", () => {
            service.create({
                title: "TestMovie",
                year: 2000,
                genres: ["test"],
            });
            const movie = service.getOne(1);
            expect(movie).toBeDefined();
            expect(movie.id).toEqual(1);
            expect(movie.title).toEqual("TestMovie");
            expect(movie.year).toEqual(2000);
            expect(movie.genres).toEqual(["test"]);
        });

        it("should throw a NotFoundException", () => {
            try {
                service.getOne(999);
                throw new Error();
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual("Movie with ID 999 not found.");
            }
        });
    });

    describe("deleteOne()", () => {
        it("deletes a movie", () => {
            service.create({
                title: "TestMovie",
                year: 2000,
                genres: ["test"],
            });
            const beforeDelete = service.getAll();
            service.deleteOne(1);
            const afterDelete = service.getAll();
            expect(afterDelete.length).toEqual(beforeDelete.length - 1);
            expect(afterDelete.length).toBeLessThan(beforeDelete.length);
        });

        it("should throw a NotFoundException", () => {
            try {
                service.deleteOne(999);
                throw new Error();
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual("Movie with ID 999 not found.");
            }
        });
    });

    describe("create()", () => {
        it("should create a movie", () => {
            const beforeCreateLen = service.getAll().length;
            service.create({
                title: "TestMovie",
                year: 2000,
                genres: ["test"],
            });
            const afterCreateLen = service.getAll().length;
            expect(afterCreateLen).toBeGreaterThan(beforeCreateLen);
        });
    });

    describe("update()", () => {
        it("should update a movie", () => {
            service.create({
                title: "TestMovie",
                year: 2000,
                genres: ["test"],
            });
            service.update(1, { title: "UpdatedTest" });
            const movie = service.getOne(1);
            expect(movie.title).toEqual("UpdatedTest");
        });

        it("should throw a NotFoundException", () => {
            try {
                service.update(999, {});
                throw new Error();
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual("Movie with ID 999 not found.");
            }
        });
    });
});
