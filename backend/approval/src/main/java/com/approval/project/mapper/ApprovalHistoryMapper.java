package com.approval.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.approval.project.model.ApprovalResponseDTO;
import com.approval.project.model.ApprovalSaveRequestDTO;

@Mapper
public interface ApprovalHistoryMapper {
	
	List<ApprovalResponseDTO> getApprovalHistory(Long num);
	
	int saveApprovalHistory(ApprovalSaveRequestDTO dto);
}
