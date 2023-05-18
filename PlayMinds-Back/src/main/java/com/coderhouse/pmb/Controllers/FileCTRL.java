package com.coderhouse.pmb.Controllers;

import com.coderhouse.pmb.DAO.ImageDAO;
import com.coderhouse.pmb.Entitys.Image;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/Files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileCTRL {

    @Autowired
    private ImageDAO image;

    @PostMapping("/upload")
    public ResponseEntity<List<Image>> uploadFiles(@RequestParam("files") List<MultipartFile> files) {
        List<Image> fileUrls = new ArrayList<>();

        try {
            for (MultipartFile file : files) {
                String originalFileName = file.getOriginalFilename();
                String fileExtension = StringUtils.getFilenameExtension(originalFileName);
                String uniqueFileName = UUID.randomUUID().toString() + "." + fileExtension;
                String filePath = Paths.get("src", "main", "resources", "static", "img", uniqueFileName).toString();
                Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

                String fileUrl = "localhost:8080" + "/img/" + uniqueFileName;
                Image newImage = new Image();
                newImage.setPath_img(fileUrl);
                newImage.setShow(false);
                Image imageRegister = this.image.save(newImage);
                fileUrls.add(imageRegister);
            }
            return ResponseEntity.ok(fileUrls);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
