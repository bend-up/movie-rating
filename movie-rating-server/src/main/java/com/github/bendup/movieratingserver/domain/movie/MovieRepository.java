package com.github.bendup.movieratingserver.domain.movie;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

interface MovieRepository extends ReactiveCrudRepository<Movie, String> {

    Mono<Movie> findByMovieId(String movieId);
}