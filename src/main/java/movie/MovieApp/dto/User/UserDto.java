package movie.MovieApp.dto.User;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class UserDto {
    private String name;
    private String nickname;
    private String password;
    private List<Integer> select;
}
