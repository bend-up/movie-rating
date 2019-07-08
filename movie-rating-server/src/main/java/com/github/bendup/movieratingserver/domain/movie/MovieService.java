package com.github.bendup.movieratingserver.domain.movie;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class MovieService {

    private final ReactiveMongoTemplate template;

    public MovieService(ReactiveMongoTemplate template) {
        this.template = template;
    }

    public Flux<Movie> findAll() {
        return template.findAll(Movie.class);
    }
}
