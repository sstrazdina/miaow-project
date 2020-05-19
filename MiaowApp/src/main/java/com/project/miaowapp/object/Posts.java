package com.project.miaowapp.object;

import java.util.ArrayList;
import java.util.List;

public class Posts {
    private List<Post> posts;

    public Posts() {
        posts = new ArrayList<>();
    }

    public Post get(String id) {
        for (Post post : posts) {
            if (post.getId().equals(id)) {
                return post;
            }
        }

        return null;
    }

    public boolean validate(Post post) {
        return post.getId() != null && post.getId().length() > 0 &&
                post.getDescription() != null && post.getDescription().length() < 200 &&
                post.getCreatedAt() != null &&
                post.getAuthor() != null && post.getAuthor().length() > 0;
    }

    public boolean add(Post post) {
        for (Post tweet : posts) {
            if (tweet.getId().equals(post.getId()))
                return false;
        }
        if (validate(post)) {
            posts.add(post);
            return true;
        } else return false;
    }

    public boolean edit(String id, Post post) {
        Post postToEdit = this.get(id);

        if (post == null || post.getId() != null || post.getAuthor() != null ||
                post.getCreatedAt() != null) {
            return false;
        }

        if (post.getDescription() != null) {
            postToEdit.setDescription(post.getDescription());
        }

        if (post.getPhotoLink() != null) {
            postToEdit.setPhotoLink(post.getPhotoLink());
        }

        if (post.getHashtags() != null) {
            postToEdit.setHashtags(post.getHashtags());
        }

        if (post.getLikes() != null) {
            postToEdit.setLikes(post.getLikes());
        }
        return true;
    }

    public boolean remove(String id) {
        return posts.removeIf(post -> post.getId().equals(id));
    }

    public boolean addLike(String id, String username) {
        Post editPost = this.get(id);
        if (!editPost.getLikes().contains(username)) {
            editPost.getLikes().add(username);
            return true;
        } else return false;
    }

    public boolean deleteLike(String id, String username) {
        Post editPost = this.get(id);
        return editPost.getLikes().removeIf(userlike -> userlike.equals(username));
    }

    public List<Post> addAll(List<Post> posts) {
        List<Post> invalidPosts = new ArrayList<Post>();

        for (Post post : posts) {
            if (validate(post)) {
                this.posts.add(post);
            } else {
                invalidPosts.add(post);
            }
        }
        return invalidPosts;
    }

    public void clearAll() {
        posts.clear();
    }

    public List<Post> getAll(){
        return posts;
    }
}