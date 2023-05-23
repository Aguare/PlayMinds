package com.coderhouse.pmb.Entitys.Assistant;

import com.coderhouse.pmb.Entitys.Game;
import com.coderhouse.pmb.Entitys.Image;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class MemoryGame implements Serializable {

    private Game game;

    private List<Image> imageList;

    public MemoryGame(Game game, List<Image> imageList) {
        this.game = game;
        this.imageList = imageList;
        List<Image> image2 = new ArrayList<>();
        for (Image img: imageList) {
            Image n = new Image();
            n.setId(img.getId()+100);
            n.setPath_img(img.getPath_img());
            n.setShow(false);
            image2.add(n);
        }
        this.imageList.addAll(image2);
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public List<Image> getImageList() {
        return imageList;
    }

    public void setImageList(List<Image> imageList) {
        this.imageList = imageList;
    }
}
