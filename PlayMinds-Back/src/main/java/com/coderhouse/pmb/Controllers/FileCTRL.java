package com.coderhouse.pmb.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Value;
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


    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> files) {
        List<String> fileUrls = new ArrayList<>();

        try {
            for (MultipartFile file : files) {
                String originalFileName = file.getOriginalFilename();
                String fileExtension = StringUtils.getFilenameExtension(originalFileName);
                String uniqueFileName = UUID.randomUUID().toString() + "." + fileExtension;
                String filePath = Paths.get("src", "main", "resources", "static", "img", uniqueFileName).toString();
                Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

                String fileUrl = "localhost:8080" + "/img/" + uniqueFileName;
                fileUrls.add(fileUrl);
            }

            return ResponseEntity.ok(fileUrls);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
