package movie.MovieApp.controller;

import lombok.RequiredArgsConstructor;
import movie.MovieApp.dto.UserDto;
import movie.MovieApp.dto.UserInfoDto;
import movie.MovieApp.dto.UserLoginDto;
import movie.MovieApp.dto.UserUpdateDto;
import movie.MovieApp.mapper.MovieAppMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final MovieAppMapper mapper;

    @PostMapping("/login")
    public int login(@RequestBody UserLoginDto user) {
        String name = user.getName();
        String password = user.getPassword();

        UserLoginDto userByName = mapper.getUserByName(name);

        if(userByName != null && userByName.getName().equals(name) && userByName.getPassword().equals(password)){
            return mapper.getUserId(name);
        } else {
            return 0;
        }
    }

    @PostMapping("/join")
    public int join(@RequestBody UserDto user) {
        String name = user.getName();
        String nickname = user.getNickname();
        String password = user.getPassword();

        return mapper.InsertUser(name, nickname, password);
    }

    @GetMapping("/myinfo")
    public UserDto MyInfo(@RequestParam("id") String id){
        System.out.println("myInfo"+ id);
        int userId = Integer.parseInt(id);
        UserDto user = mapper.getUser(userId);
        return user;
    }

    @GetMapping("/allinfo")
    public List<UserInfoDto> AllInfo(){
        System.out.println("allinfo");
        List<UserInfoDto> userAll = mapper.getUserAll();
        return userAll;
    }

    // 수정
    @PostMapping("/update")
    public int UpdateUser(@RequestParam("id") String id ,@RequestBody UserUpdateDto user){
        System.out.println("update");

        int userId = Integer.parseInt(id);

        String nickname = user.getNickname();
        String password = user.getPassword();

        int num = mapper.UpdateUser(userId, nickname, password);

        if (num == 1){
            return num;
        } else {
            return -1;
        }
    }

    // 삭제

}
