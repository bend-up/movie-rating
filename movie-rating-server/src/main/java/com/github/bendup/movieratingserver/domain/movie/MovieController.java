package com.github.bendup.movieratingserver.domain.movie;

import com.github.bendup.movieratingserver.domain.review.Review;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController()
@RequestMapping("/movies")
public class MovieController {

    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping()
    public Flux<Movie> getAll() {
        return movieService.getAll();
    }

    @CrossOrigin
    @PostMapping("/{id}/reviews")
    @Transactional
    public Mono<ResponseEntity<Movie>> addReview(@PathVariable("id") String id, @Valid @RequestBody Review review) {

        return movieService.getById(id)
                .flatMap(existingMovie -> {
                    existingMovie.addReview(review);
                    return movieService.save(existingMovie);
                })
                .map(updatedMovie -> ResponseEntity.ok(updatedMovie))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}