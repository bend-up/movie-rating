package com.github.bendup.movieratingserver.domain.movie;

import com.github.bendup.movieratingserver.domain.review.Review;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@WebFluxTest
public class MovieControllerTests {

    private static final String JSON_EMPTY_ARRAY = "[]";
    private static final String TEST_ID = "test-id";

    @Autowired
    private WebTestClient webTestClient;
    @MockBean
    MovieService movieService;

    @Test
    public void getMovies() {

        final var TEST_TITLE = "movie 1";
        final var TEST_GENRE = "family";
        Movie movie1 = new Movie();
        movie1.setTitle(TEST_TITLE);
        Movie movie2 = new Movie();
        movie2.setGenre(TEST_GENRE);
        var movies = Collections.unmodifiableList(List.of(movie1, movie2));

        given(movieService.getAll()).willReturn(Flux.fromIterable(movies));

        var response = webTestClient
                .get()
                .uri("/movies" )
                .exchange()
                .expectStatus().isOk()
                .returnResult(Movie.class)
                .getResponseBody()
                .collectList()
                .block();


        assertThat(response.get(0).getTitle()).isEqualTo(TEST_TITLE);
        assertThat(response.get(1).getGenre()).isEqualTo(TEST_GENRE);
    }

    @Test
    public void getMoviesEmptyResponse() {

        given(movieService.getAll()).willReturn(Flux.empty());

        var response = webTestClient
                .get()
                .uri("/movies" )
                .exchange()
                .expectStatus().isOk();

        assertThat(response.expectBody().json(JSON_EMPTY_ARRAY));
    }


    @Test
    public void addReviewForNonExistingMovie() {

        given(movieService.getById(any())).willReturn(Mono.empty());

        final var TEST_REVIEW = new Review(7.0);

        webTestClient
            .post()
            .uri("/movies/" + TEST_ID + "/reviews")
            .syncBody(TEST_REVIEW)
            .exchange()
            .expectStatus().isNotFound();
    }

    @Test
    public void addReviewBadData() {
        given(movieService.getById(TEST_ID)).willReturn(Mono.just(new Movie()));

        webTestClient
                .post()
                .uri("/movies/" + TEST_ID + "/reviews")
                .syncBody("oops")
                .exchange()
                .expectStatus().is4xxClientError();
    }

    @Test
    public void addReviewInvalidData() {


        given(movieService.getById(TEST_ID)).willReturn(Mono.just(new Movie()));

        final var INVALID_REVIEWS = Collections.unmodifiableSet(Set.of(
                new Review(-100.0),
                new Review(-0.000000001),
                new Review(10.000000001),
                new Review(0.0),
                new Review(0.99999999999),
                new Review(Double.MAX_VALUE),
                new Review(Double.MIN_VALUE)

        ));


        INVALID_REVIEWS.stream().forEach(
                review ->
                        webTestClient
                                .post()
                                .uri("/movies/" + TEST_ID + "/reviews")
                                .syncBody(review)
                                .exchange()
                                .expectStatus().isBadRequest());
    }

    @Test
    public void addReviewNoData() {

        given(movieService.getById(TEST_ID)).willReturn(Mono.just(new Movie()));

        webTestClient
                .post()
                .uri("/movies/" + TEST_ID + "/reviews")
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    public void addReview() {
        final var TEST_MOVIE = new Movie();
        given(movieService.getById(TEST_ID)).willReturn(Mono.just(TEST_MOVIE));
        given(movieService.save(TEST_MOVIE)).willReturn(Mono.just(TEST_MOVIE));

        final var VALID_REVIEWS = Collections.unmodifiableSet(Set.of(
                new Review(10.0),
                new Review(2.0),
                new Review(1.123456789),
                new Review(7.88888888888888)

        ));


        VALID_REVIEWS.stream().forEach(
                review ->
                        webTestClient
                                .post()
                                .uri("/movies/" + TEST_ID + "/reviews")
                                .syncBody(review)
                                .exchange()
                                .expectStatus().isOk());
    }
}