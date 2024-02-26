package movie.MovieApp.dto.User;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserUpdateDto {
    private String id;
    private String nickname;
    private String password;
}
