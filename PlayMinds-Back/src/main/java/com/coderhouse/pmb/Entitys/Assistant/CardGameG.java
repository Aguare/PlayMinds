package com.coderhouse.pmb.Entitys.Assistant;

import com.coderhouse.pmb.Entitys.Card;
import com.coderhouse.pmb.Entitys.Game;

import java.util.List;

public class CardGameG {
    private Game game;
    private List<Card> cards;

    public CardGameG(Game game, List<Card> cards) {
        this.game = game;
        this.cards = cards;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }
}
