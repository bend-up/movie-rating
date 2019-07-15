package com.github.bendup.movieratingserver.domain.movie;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class MovieService {

    private final ReactiveMongoTemplate template;
    private final MovieRepository movieRepository;

    public MovieService(ReactiveMongoTemplate template, MovieRepository movieRepository) {
        this.template = template;
        this.movieRepository = movieRepository;
    }

    public Flux<Movie> getAll() {
        return template.findAll(Movie.class);
    }

    public Mono<Movie> getById(String id) {
        return movieRepository.findByMovieId(id);
    }

    public Mono<Movie> save(Movie movie) {
        return template.save(movie);
    }
}
