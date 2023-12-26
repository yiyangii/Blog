package com.mercury.BlogSystemPost.service;

import com.mercury.BlogSystemPost.bean.*;
import com.mercury.BlogSystemPost.config.PostRabbitMQConfig;
import com.mercury.BlogSystemPost.dao.*;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Date;
import java.util.*;


@Service
public class PostService {
    private static final Logger logger = LoggerFactory.getLogger(PostService.class);


    private final PostRepository postRepository;
    private final RabbitTemplate rabbitTemplate;

    private final CategoryRepository categoryRepository;

    private final PostCategoryRepository postCategoryRepository;
    private final PostTagRepository postTagRepository;
    private final ImageRepository imageRepository;

    private final TagRepository tagRepository;

    private static final String EXCHANGE_NAME = "blog.exchange";
    private static final String ROUTING_KEY_POSTS_DELETED_FOR_USER = "posts.deleted.for.user";
    private static final String ROUTING_KEY_USER_DELETE_FAILED = "user.delete.failed";

    private static final String ROUTING_KEY_POST_CREATED = "blog.post.created";
    private static final String ROUTING_KEY_POST_UPDATED = "blog.post.updated";
    private static final String ROUTING_KEY_POST_DELETED = "blog.post.deleted";

    private static final String ROUTING_KEY_POST_COMMUNITY = "blog.post.community";




    @Autowired
    public PostService(PostRepository postRepository, RabbitTemplate rabbitTemplate, CategoryRepository categoryRepository, PostCategoryRepository postCategoryRepository, PostTagRepository postTagRepository, ImageRepository imageRepository, TagRepository tagRepository) {
        this.postRepository = postRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.categoryRepository = categoryRepository;
        this.postCategoryRepository = postCategoryRepository;
        this.postTagRepository = postTagRepository;
        this.imageRepository = imageRepository;
        this.tagRepository = tagRepository;
    }


    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(int id) {
        return postRepository.findById((long) id);
    }
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public Post savePost(Post post) {
        System.out.println(post);
        try {
            Set<PostCategory> postCategories = post.getPostCategories();
            if (postCategories != null) {
                postCategories.forEach(postCategory -> {
                    Category category = categoryRepository.findById(postCategory.getCategory().getId()).orElse(null);
                    if (category == null) {
                        throw new RuntimeException("Category not found for id: " + postCategory.getCategory().getId());
                    }
                    postCategory.setCategory(category);
                    postCategory.setPost(post);
                });
            }
            Set<PostTag> postTags = post.getPostTags();
            if (postTags != null) {
                postTags.forEach(postTag -> {
                    Tag tag = tagRepository.findById(postTag.getTag().getId()).orElse(null);
                    if (tag == null) {
                        throw new RuntimeException("Tag not found for id: " + postTag.getTag().getId());
                    }
                    postTag.setTag(tag);
                    postTag.setPost(post);
                });
            }
            List<Image> images = post.getImages();
            if (images != null) {
                post.getImages().forEach(img -> img.setPost(post));
            }

            Set<Comment> comments = post.getComments();
            System.out.println("Number of comments: " + (comments != null ? comments.size() : "null"));

            if (comments != null) {
                comments.forEach(comment -> {
                    comment.setPost(post);

                });
            }
            Post savedPost = postRepository.save(post);



            rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY_POST_CREATED, post);

            return savedPost;
        } catch (Exception e) {
            throw new RuntimeException("Error while saving post", e);
        }
    }

    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public Post updatePost(Post post) {
        try {
            Post existingPost = postRepository.findById((long) post.getId())
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            Set<PostCategory> existingCategories = existingPost.getPostCategories();
            Set<PostCategory> newCategories = new HashSet<>();
            for (PostCategory existingCategory : existingCategories) {
                if (post.getPostCategories().stream().anyMatch(pc -> pc.getCategory().getId() == existingCategory.getCategory().getId())) {
                    newCategories.add(existingCategory);
                } else {
                    postCategoryRepository.delete(existingCategory);
                }
            }

            for (PostCategory newCategory : post.getPostCategories()) {
                if (!existingCategories.stream()
                        .anyMatch(ec -> ec.getCategory().getId() == newCategory.getCategory().getId())) {
                    Category category = categoryRepository.findById(newCategory.getCategory().getId())
                            .orElseThrow(() -> new RuntimeException("Category not found"));
                    newCategory.setCategory(category);
                    newCategory.setPost(existingPost);
                    newCategories.add(newCategory);
                }
            }
            existingCategories.clear();
            existingCategories.addAll(newCategories);

            // Handle tags
            Set<PostTag> existingTags = existingPost.getPostTags();
            Set<PostTag> newTags = new HashSet<>();
            for (PostTag existingTag : existingTags) {
                if (post.getPostTags().stream().anyMatch(tag -> tag.getTag().getId() == existingTag.getTag().getId())) {
                    newTags.add(existingTag);
                } else {
                    postTagRepository.delete(existingTag);
                }
            }
            for (PostTag newTag : post.getPostTags()) {
                if (!existingTags.stream().anyMatch(et -> et.getTag().getId() == newTag.getTag().getId())) {
                    Tag tag = tagRepository.findById(newTag.getTag().getId())
                            .orElseThrow(() -> new RuntimeException("Tag not found"));
                    newTag.setTag(tag);
                    newTag.setPost(existingPost);
                    newTags.add(newTag);
                }
            }
            existingTags.clear();
            existingTags.addAll(newTags);

            // Handle images
            List<Image> existingImages = existingPost.getImages();
            List<Image> newImages = new ArrayList<>();
            for (Image existingImage : existingImages) {
                if (post.getImages().stream().anyMatch(img -> img.getId() == existingImage.getId())) {
                    newImages.add(existingImage);
                } else {
                    imageRepository.delete(existingImage);
                }
            }
            for (Image newImage : post.getImages()) {
                if (existingImages.stream().noneMatch(img -> img.getId() == newImage.getId())) {
                    newImage.setPost(existingPost);
                    newImages.add(imageRepository.save(newImage));
                }
            }
            existingImages.clear();
            existingImages.addAll(newImages);

            // Update other fields
            existingPost.setTitle(post.getTitle());
            existingPost.setAuthorId(post.getAuthorId());
            existingPost.setUpdatedAt(new Date(System.currentTimeMillis()));

            rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY_POST_UPDATED, existingPost);

            return postRepository.save(existingPost);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public void deletePost(int id) {
        //postRepository.deleteById((long) id);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY_POST_DELETED, id);
    }

    @Transactional
    public void actualDeletePost(long id) {
        postRepository.deleteById(id);
    }

    @Transactional
    @RabbitListener(queues = "postDeletedAckQueue")
    public void handlePostDeleteAck(int id) {
        try {

            actualDeletePost((long) id);
        } catch (Exception e) {
            logger.error("Error while deleting post ID: {}", id, e);
        }
    }






    @Transactional
    @RabbitListener(queues = "queue.user.delete.request.post")
    public void handleUserDeleteRequest(Long userId) {
        logger.info("receive delete request");
        try {
            postRepository.deleteByAuthorId(userId);
            rabbitTemplate.convertAndSend(PostRabbitMQConfig.EXCHANGE_NAME, PostRabbitMQConfig.ROUTING_KEY_POST_DELETED_USER, userId);
            logger.info("send delete message to user service");
        } catch(Exception e) {
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY_USER_DELETE_FAILED, userId);
            logger.error("Error deleting posts for user ID: " + userId , e);
        }
    }


    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public Post savePostToCommunity(Post post,String communityName) {
        try {
            Set<PostCategory> postCategories = post.getPostCategories();
            if (postCategories != null) {
                postCategories.forEach(postCategory -> {
                    Category category = categoryRepository.findById(postCategory.getCategory().getId()).orElse(null);
                    if (category == null) {
                        throw new RuntimeException("Category not found for id: " + postCategory.getCategory().getId());
                    }
                    postCategory.setCategory(category);
                    postCategory.setPost(post);
                });
            }
            Set<PostTag> postTags = post.getPostTags();
            if (postTags != null) {
                postTags.forEach(postTag -> {
                    Tag tag = tagRepository.findById(postTag.getTag().getId()).orElse(null);
                    if (tag == null) {
                        throw new RuntimeException("Tag not found for id: " + postTag.getTag().getId());
                    }
                    postTag.setTag(tag);
                    postTag.setPost(post);
                });
            }
            List<Image> images = post.getImages();
            if (images != null) {
                post.getImages().forEach(img -> img.setPost(post));
            }
            Post savedPost = postRepository.save(post);

            Map<String, Object> message = new HashMap<>();
            message.put("postId", post.getId());
            message.put("communityName",communityName);



            rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY_POST_COMMUNITY, message);
            logger.info("send to community");


            return savedPost;
        } catch (Exception e) {
            throw new RuntimeException("Error while saving post", e);
        }
    }

    // Add this method to the PostService class

    public List<Post> getPostsByAuthorId(int authorId) {
        return postRepository.findByAuthorId((long) authorId);
    }





}
