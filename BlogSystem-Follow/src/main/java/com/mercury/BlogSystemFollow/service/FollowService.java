package com.mercury.BlogSystemFollow.service;

import com.mercury.BlogSystemFollow.bean.BlogUserFollower;
import com.mercury.BlogSystemFollow.dao.FollowerRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FollowService {

    @Autowired
    FollowerRepository followerRepository;
    @Autowired
    RabbitTemplate rabbitTemplate;

    public BlogUserFollower createFollow(BlogUserFollower blogUserFollower) {
        blogUserFollower.setFollowDate(new Date(System.currentTimeMillis()));
        return followerRepository.save(blogUserFollower);
    }


    public Optional<BlogUserFollower> getFollowById(Integer id) {
        return followerRepository.findById(Long.valueOf(id));
    }


    public List<BlogUserFollower> getAllFollows() {
        return followerRepository.findAll();
    }


    public BlogUserFollower updateFollow(BlogUserFollower blogUserFollower) {
        return followerRepository.save(blogUserFollower);
    }

    public void deleteFollow(Integer id) {
        followerRepository.deleteById(Long.valueOf(id));
    }

    @Transactional
    @RabbitListener(queues = "queue.user.delete.request.follower")
    public void deleteUserFollowers(Long userId) {
        try {

            List<BlogUserFollower> followerList = followerRepository.findByFollowerId(Math.toIntExact(userId));

            List<BlogUserFollower> followedList = followerRepository.findByFollowedId(Math.toIntExact(userId));

            for (BlogUserFollower follower : followerList) {

                followerRepository.deleteById(Long.valueOf(follower.getId()));
            }

            for (BlogUserFollower followed : followedList) {
                followerRepository.deleteById(Long.valueOf(followed.getId()));
            }
            rabbitTemplate.convertAndSend("followerDeletedUserQueue",Long.valueOf(userId));
        } catch (NumberFormatException e) {
            System.out.println("Error parsing user ID: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }

}
