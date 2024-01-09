package com.mercury.BlogSystemPost.service;

import com.mercury.BlogSystemPost.bean.Category;
import com.mercury.BlogSystemPost.dao.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Transactional
    public Long getOrCreateCategoryByName(String name) {
        // Check if the category already exists
        Optional<Category> existingCategory = categoryRepository.findByName(name);
        if (existingCategory.isPresent()) {
            // If it exists, return its ID
            return existingCategory.get().getId();
        } else {
            // If not, create a new one
            Category newCategory = new Category();
            newCategory.setName(name);
            // Set other properties as needed
            newCategory = categoryRepository.save(newCategory);
            // Return the new category's ID
            return newCategory.getId();
        }
    }
//    public void updateCategoryCount(Long id, int count) {
//        Category category = getCategoryById(id).orElseThrow(() -> new RuntimeException("Category not found"));
//        category.setCount(count);
//        categoryRepository.save(category);
//    }
}
