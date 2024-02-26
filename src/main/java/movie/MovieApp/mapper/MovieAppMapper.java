package movie.MovieApp.mapper;

import movie.MovieApp.dto.Movie.MovieDto;
import movie.MovieApp.dto.Tag.TagDto;
import movie.MovieApp.dto.User.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MovieAppMapper {

    @Select("SELECT * FROM MovieApp WHERE id=#{id}")
    UserMyInfoDto getUser(@Param("id") int id);

    @Select("SELECT nickname FROM MovieApp WHERE id=#{id}")
    UserAllInfoDto getOtherUser(@Param("id") int id);

    @Select("SELECT id, nickname FROM MovieApp")
    List<UserInfoDto> getUserAll();

    @Select("SELECT * FROM MovieApp WHERE name=#{name}")
    UserLoginDto getUserByName(@Param("name") String name);

    @Select("SELECT nickname FROM MovieApp WHERE id=#{id}")
    UserInfoDto getUserNickname(@Param("id") int id);

    @Select("SELECT password FROM MovieApp WHERE id=#{id}")
    UserPassDto getUserPassword(@Param("id") int id);

    @Select("SELECT id FROM MovieApp WHERE name=#{name}")
    int getUserId(@Param("name") String name);

    @Insert("INSERT INTO MovieApp (name, nickname, password) VALUES(#{name}, #{nickname}, #{password})")
    int InsertUser(@Param("name") String name, @Param("nickname") String nickname, @Param("password") String password);

    @Update("UPDATE MovieApp SET nickname=#{nickname}, password=#{password} WHERE id=#{id}")
    int UpdateUser(@Param("id") int id, @Param("nickname") String nickname, @Param("password") String password);

    @Delete("DELETE FROM MovieApp WHERE id=#{id}")
    int DeleteUser(@Param("id") int id);

    // Tag
    @Select("SELECT id, TagName FROM Tag")
    List<TagDto> getTagAll();

    @Select("SELECT TagNum FROM Tag WHERE id=#{id}")
    int getTagId(@Param("id") int id);

    @Select("SELECT TagName FROM Tag WHERE id=#{id}")
    String getTagName(@Param("id") int id);

    // UserTags
    @Insert("INSERT INTO UserTags (movie_id, tag_id) VALUES(#{movie_id}, #{tag_id})")
    int InsertTag(@Param("movie_id") int movie_id, @Param("tag_id") int tag_id);

    @Select("SELECT tag_id FROM UserTags WHERE movie_id=#{movie_id}")
    List<Integer> getUserTag(@Param("movie_id") int movie_id);

    // like
    @Insert("INSERT INTO UserMovie (movie_id, like_id) VALUES(#{movie_id}, #{like_id})")
    int InsertUserLike(@Param("movie_id") int movie_id, @Param("like_id") int like_id);

    @Delete("DELETE FROM UserMovie WHERE movie_id=#{movie_id} AND like_id=#{like_id}")
    int DeleteUserDisLike(@Param("movie_id") int movie_id, @Param("like_id") int like_id);

    @Select("SELECT like_id FROM UserMovie WHERE movie_id=#{movie_id}")
    List<MovieDto> getUserLikeAll(@Param("movie_id") int movie_id);

    @Select("SELECT COUNT(*) FROM UserMovie WHERE movie_id=#{movie_id} AND like_id=#{like_id}")
    int getUserLike(@Param("movie_id") int movie_id, @Param("like_id") int like_id); // null도 나올 수 있어서 Integer
}
