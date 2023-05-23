package com.coderhouse.pmb.Entitys.Assistant;

import com.coderhouse.pmb.Entitys.Comment;
import com.coderhouse.pmb.Entitys.Game;

import java.io.Serializable;
import java.util.List;

public class GameOBJ implements Serializable {
    private Game game;
    private List<Comment> comments;

    public GameOBJ(Game game, List<Comment> comments) {
        this.game = game;
        this.comments = comments;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
