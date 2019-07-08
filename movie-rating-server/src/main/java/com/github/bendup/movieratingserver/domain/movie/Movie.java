package com.github.bendup.movieratingserver.domain.movie;

import com.github.bendup.movieratingserver.domain.review.Review;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Document(collection = "movies")
class Movie {

    @Id
    private String id;
    private String title;
    private String genre;
    private Instant released;
    private List<Review> reviews;
}
