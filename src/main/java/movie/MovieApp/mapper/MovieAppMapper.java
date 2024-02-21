package movie.MovieApp.mapper;

import movie.MovieApp.dto.UserDto;
import movie.MovieApp.dto.UserInfoDto;
import movie.MovieApp.dto.UserLoginDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MovieAppMapper {

    @Select("SELECT * FROM MovieApp WHERE id=#{id}")
    UserDto getUser(@Param("id") int id);

    @Select("SELECT nickname FROM MovieApp")
    List<UserInfoDto> getUserAll();

    @Select("SELECT * FROM MovieApp WHERE name=#{name}")
    UserLoginDto getUserByName(@Param("name") String name);

    @Select("SELECT id FROM MovieApp WHERE name=#{name}")
    int getUserId(@Param("name") String name);

    @Insert("INSERT INTO MovieApp (name, nickname, password) VALUES(#{name}, #{nickname}, #{password})")
    int InsertUser(@Param("name") String name, @Param("nickname") String nickname, @Param("password") String password);

    @Update("UPDATE MovieApp SET nickname=#{nickname}, password=#{password} WHERE id=#{id}")
    int UpdateUser(@Param("id") int id, @Param("nickname") String nickname, @Param("password") String password);

    @Delete("DELETE FROM MovieApp WHERE id=#{id}")
    int DeleteUser(@Param("id") int id);
}