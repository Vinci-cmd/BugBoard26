package com.bugboard.dao;

import com.bugboard.model.Issue;
import com.bugboard.model.IssuePriority;
import com.bugboard.model.IssueStatus;
import com.bugboard.model.IssueType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IssueDAO extends JpaRepository<Issue, Long> {

    // Questa query è "intelligente": se un parametro è NULL, ignora quel filtro.
    // Funziona per tutte le combinazioni (es. solo Tipo, Tipo+Stato, Tutto vuoto = findAll).
    @Query("SELECT i FROM Issue i WHERE " +
           "(:tipo IS NULL OR i.tipo = :tipo) AND " +
           "(:stato IS NULL OR i.stato = :stato) AND " +
           "(:priorita IS NULL OR i.priorita = :priorita)")
    List<Issue> searchIssues(@Param("tipo") IssueType tipo, 
                             @Param("stato") IssueStatus stato, 
                             @Param("priorita") IssuePriority priorita);
                             
    // Nota: Ho rimosso i vecchi metodi findByTipo, findByStato, findByFilters
    // perché ora searchIssues li sostituisce tutti.
}