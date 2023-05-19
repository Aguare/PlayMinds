package com.coderhouse.pmb.Entitys.Assistant;

import com.coderhouse.pmb.Entitys.Game;
import com.coderhouse.pmb.Entitys.Phrase;

import java.util.List;

public class HangedGame {

    private Game game;
    private List<Phrase> phrases;

    public HangedGame(Game game, List<Phrase> phrases) {
        this.game = game;
        this.phrases = phrases;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public List<Phrase> getPhrases() {
        return phrases;
    }

    public void setPhrases(List<Phrase> phrases) {
        this.phrases = phrases;
    }
}
