package com.bugboard.dao;

import com.bugboard.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentDAO extends JpaRepository<Comment, Integer> {

    List<Comment> findByIssueId(Integer issueId);
}