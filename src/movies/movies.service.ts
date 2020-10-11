import { Injectable } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        return this.movies.find(movie => movie.id === Number(id));
    }

    deleteOne(id: string): boolean {
        this.movies.filter(movie => movie.id !== Number(id));
        return true;
    }

    create(movieData) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }
}
