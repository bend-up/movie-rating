package com.github.bendup.movieratingserver.domain.movie;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

interface MovieRepository extends ReactiveCrudRepository<Movie, String> {
}