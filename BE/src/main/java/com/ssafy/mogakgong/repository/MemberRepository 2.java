package com.ssafy.mogakgong.repository;

import com.ssafy.mogakgong.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByEmail(String email);
    List<Member> findByIsExist(Integer isExist);
}
