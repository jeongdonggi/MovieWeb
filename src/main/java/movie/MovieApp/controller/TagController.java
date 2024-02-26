package movie.MovieApp.controller;

import lombok.RequiredArgsConstructor;
import movie.MovieApp.dto.Tag.TagDto;
import movie.MovieApp.mapper.MovieAppMapper;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TagController {

    private final MovieAppMapper mapper;

    @GetMapping("/alltag")
    public List<TagDto> alltag(){
        return mapper.getTagAll();
    }

    @PostMapping("/usertag")
    public List<Integer> usertage(@RequestBody Map<String, String> request) {
        int userId = Integer.parseInt(request.get("id"));
        List<Integer> userTag = mapper.getUserTag(userId);

        List<Integer> tag = new ArrayList<>();

        for (int i = 0; i < 5; i++){
            int tagId = mapper.getTagId(userTag.get(i));
            tag.add(tagId);
        }

        System.out.println("TagController.usertage");
        System.out.println("tag = " + tag);
        return tag;
    }

    @PostMapping("/usertagname")
    public List<String> usertagename(@RequestBody Map<String, String> request) {
        int userId = Integer.parseInt(request.get("id"));
        List<Integer> userTag = mapper.getUserTag(userId);

        List<String> tag = new ArrayList<>();

        for (int i = 0; i < 5; i++){
            String tagName = mapper.getTagName(userTag.get(i));
            tag.add(tagName);
        }

        System.out.println("TagController.usertage");
        System.out.println("tag = " + tag);
        return tag;
    }
}
