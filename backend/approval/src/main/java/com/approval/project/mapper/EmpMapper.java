package com.approval.project.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.approval.project.model.LoginRequestDTO;
import com.approval.project.model.LoginResponseDTO;

@Mapper
public interface EmpMapper {
	LoginResponseDTO login(LoginRequestDTO dto);

}
