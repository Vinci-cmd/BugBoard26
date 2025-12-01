package com.bugboard.dao;

import com.bugboard.model.Issue;
import com.bugboard.model.IssueStatus;
import com.bugboard.model.IssueType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IssueDAO extends JpaRepository<Issue, Integer> {

    @Query("SELECT i FROM Issue i WHERE i.tipo = :tipo AND i.stato = :stato")
    List<Issue> findByFilters(@Param("tipo") IssueType tipo, @Param("stato") IssueStatus stato);
}