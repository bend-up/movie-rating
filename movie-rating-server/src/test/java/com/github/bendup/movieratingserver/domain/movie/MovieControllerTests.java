package com.github.bendup.movieratingserver.domain.movie;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.*;

@RunWith(SpringRunner.class)
@WebFluxTest
public class MovieControllerTests {

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

        given(movieService.findAll()).willReturn(Flux.fromIterable(movies));

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

}