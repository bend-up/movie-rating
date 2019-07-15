package com.github.bendup.movieratingserver.domain.movie;

import com.github.bendup.movieratingserver.domain.review.Review;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "movies")
class Movie {

    @Id
    private String _id;
    private String movieId = UUID.randomUUID().toString();
    private String title;
    private String genre;
    private Instant released;
    private List<Review> reviews = new ArrayList<>();

    public boolean addReview(Review review) {
        return getReviews().add(review);
    }
}
