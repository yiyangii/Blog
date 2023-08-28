package com.mercury.BlogSystemProject.service.post_service;

import com.mercury.BlogSystemProject.bean.Tag;
import com.mercury.BlogSystemProject.bean.PostTag;
import com.mercury.BlogSystemProject.dao.TagRepository;
import com.mercury.BlogSystemProject.dao.PostTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TagService {

    @Autowired
    private final TagRepository tagRepository;
    private final PostTagRepository postTagRepository;
    private static final Logger logger = LoggerFactory.getLogger(TagService.class);

    @Autowired
    public TagService(TagRepository tagRepository, PostTagRepository postTagRepository) {
        this.tagRepository = tagRepository;
        this.postTagRepository = postTagRepository;
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }

    public Tag saveTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }

    public Set<PostTag> getAssociatedPostsByTagId(Long tagId) {
        Optional<Tag> tagOpt = tagRepository.findById(tagId);
        if (tagOpt.isPresent()) {
            return tagOpt.get().getPostTags();
        }
        return Set.of(); // return an empty set
    }
}
