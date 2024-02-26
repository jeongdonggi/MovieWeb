package movie.MovieApp.controller;

import lombok.RequiredArgsConstructor;
import movie.MovieApp.dto.Movie.MovieDto;
import movie.MovieApp.dto.User.*;
import movie.MovieApp.mapper.MovieAppMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
        List<Integer> select = user.getSelect();

        int insertUser = mapper.InsertUser(name, nickname, password);
        int insertTag = 0;

        int userId = mapper.getUserId(name);

        for(int i = 0 ; i < select.size(); i++){
            insertTag += mapper.InsertTag(userId, select.get(i));
        }

        int insertReturn = insertUser * insertTag;

        System.out.println("insertReturn = " + insertReturn);
        return insertReturn;
    }

    @PostMapping("/myinfo")
    public UserMyInfoDto MyInfo(@RequestBody Map<String, String> request){
        System.out.println("UserController.MyInfo");
        int userId = Integer.parseInt(request.get("id"));
        UserMyInfoDto user = mapper.getUser(userId);
        return user;
    }

    @PostMapping("/otherinfo")
    public UserAllInfoDto otherInfo(@RequestBody Map<String, String> request) {
        System.out.println("UserController.otherInfo");
        int userId = Integer.parseInt(request.get("id"));
        UserAllInfoDto otherUser = mapper.getOtherUser(userId);
        return otherUser;
    }

    @GetMapping("/allinfo")
    public List<UserInfoDto> AllInfo(){
        System.out.println("allinfo");
        List<UserInfoDto> userAll = mapper.getUserAll();
        return userAll;
    }

    // 수정
    @PostMapping("getnick")
    public UserInfoDto getNick(@RequestBody Map<String, String> request) {
        System.out.println("UserController.getNick");

        int userId = Integer.parseInt(request.get("id"));
        return mapper.getUserNickname(userId);
    }

    @PostMapping("/update")
    public int UpdateUser(@RequestBody UserUpdateDto user){
        System.out.println("update");

        String id = user.getId();
        String nickname = user.getNickname();
        String password = user.getPassword();

        int userId = Integer.parseInt(id);

        if ( nickname.equals("") || password.equals("")){
            return -1;
        } else {
            int num = mapper.UpdateUser(userId, nickname, password);

            if (num == 1){
                return num;
            } else {
                return -1;
            }
        }
    }

    // 삭제
    @PostMapping("/getpass")
    public UserPassDto getPass(@RequestBody Map<String, String> request){
        System.out.println("UserController.getPass");

        int userId = Integer.parseInt(request.get("id"));

        return mapper.getUserPassword(userId);
    }

    @PostMapping("/withdraw")
    public int Delete(@RequestBody Map<String, String> request) {
        System.out.println("UserController.Delete");

        int userId = Integer.parseInt(request.get("id"));

        return mapper.DeleteUser(userId);
    }


    // 영화
    @PostMapping("/movielike")
    public int movielike(@RequestBody Map<String, String> request) {
        System.out.println("UserController.movielike");

        int userId = Integer.parseInt(request.get("id"));
        int likeId = Integer.parseInt(request.get("like"));

        if( mapper.getUserLike(userId, likeId) != 1 ){
            return mapper.InsertUserLike(userId, likeId);
        } else {
            return -1;
        }
    }

    @PostMapping("/moviedislike")
    public int moviedislike(@RequestBody Map<String, String> request) {
        System.out.println("UserController.moviedislike");

        int userId = Integer.parseInt(request.get("id"));
        int likeId = Integer.parseInt(request.get("like"));

        return mapper.DeleteUserDisLike(userId, likeId);
    }

    @PostMapping("/movielikeall")
    public List<MovieDto> movielikeall(@RequestBody Map<String, String> request) {
        System.out.println("UserController.movielikeall");

        int userId = Integer.parseInt(request.get("id"));

        return mapper.getUserLikeAll(userId);
    }

    @PostMapping("/mylike")
    public int mylike(@RequestBody Map<String, String> request) {
        System.out.println("UserController.mylike");

        int userId = Integer.parseInt(request.get("id"));
        int likeId = Integer.parseInt(request.get("like"));

        return mapper.getUserLike(userId, likeId);
    }
}
