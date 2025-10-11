package com.approval.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.approval.project.model.StatusResponseDTO;

@Mapper
public interface StatusMapper {
	List<StatusResponseDTO> getAllStatus(); 
}
