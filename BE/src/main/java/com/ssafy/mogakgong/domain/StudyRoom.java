package com.ssafy.mogakgong.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "study_room")
@Getter @Setter
@ApiModel(value = "SturyRoom : 스터디룸 정보", description = "스터디룸의 상세 정보를 나타낸다.")
public class StudyRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @ApiModelProperty(value = "스터디룸 번호")
    private Integer id;

    @Column(name = "title")
    @ApiModelProperty(value = "스터디룸 이름")
    private String title;

    @Column(name = "password")
    @ApiModelProperty(value = "스터디룸 비밀번호")
    private String password;

    @Column(name = "description")
    @ApiModelProperty(value = "스터디룸 설명")
    private String description;

    @Column(name = "start_date")
    @ApiModelProperty(value = "스터디룸 시작 시간")
    private Timestamp startDate;

    @Column(name = "end_date")
    @ApiModelProperty(value = "스터디룸 종료 시간")
    private Timestamp endDate;

    @Column(name = "limit")
    @ApiModelProperty(value = "스터디룸 제한 인원")
    private Integer limit;

    @Column(name = "img")
    @ApiModelProperty(value = "스터디룸 대표 사진")
    private String img;

    @Column(name = "goal_time")
    @ApiModelProperty(value = "스터디룸 공부 목표 시간")
    private Integer goalTime;

    @Column(name = "url")
    @ApiModelProperty(value = "스터디룸 주소")
    private String url;

    @Column(name = "is_exist")
    @ApiModelProperty(value = "스터디룸 존재 여부")
    private Integer isExist;

    @Column(name = "reg_date")
    @CreationTimestamp
    @ApiModelProperty(value = "스터디룸 생성 요청 등록 날짜")
    private Timestamp regDate;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @ApiModelProperty(value = "스터디룸 방장 정보")
    private Member member;

}
