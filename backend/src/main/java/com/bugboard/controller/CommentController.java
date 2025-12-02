/* package com.bugboard.controller;

import com.bugboard.dto.CommentDTO;
import com.bugboard.model.Comment;
import com.bugboard.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Endpoint: POST /api/issues/{id}/comments
    @PostMapping("/{issueId}/comments")
    public ResponseEntity<Comment> postComment(@PathVariable Long issueId, @RequestBody CommentDTO req) {
        Comment nuovoCommento = commentService.addComment(issueId, req.getTesto());
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoCommento);
    }

    // Endpoint: GET /api/issues/{id}/comments
    @GetMapping("/{issueId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Integer issueId) {
        // Nota: Assicurati che i tipi (Integer/Long) siano coerenti col tuo Model
        return ResponseEntity.ok(commentService.getCommentsForIssue(issueId));
    }
}
    */