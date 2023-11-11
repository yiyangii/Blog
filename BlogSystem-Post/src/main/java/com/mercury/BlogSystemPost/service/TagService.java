package com.mercury.BlogSystemPost.service;

import com.mercury.BlogSystemPost.bean.PostTag;
import com.mercury.BlogSystemPost.bean.Tag;
import com.mercury.BlogSystemPost.dao.PostTagRepository;
import com.mercury.BlogSystemPost.dao.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        return Set.of();
    }

    public List<Tag> getTopTags(int limit) {
        Pageable topTen = PageRequest.of(0, limit, Sort.by("counts").descending());
        Page<Tag> page = tagRepository.findTopTags(topTen);
        return page.getContent();
    }
}
