package com.approval.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.approval.project.model.ApprovalRequestDTO;
import com.approval.project.model.ApprovalResponseDTO;
import com.approval.project.model.ApprovalSaveRequestDTO;

@Mapper
public interface ApprovalMapper {
	
	List<ApprovalResponseDTO> getApprovalList(ApprovalRequestDTO dto);

	int getApprovalTotalCnt(ApprovalRequestDTO dto);
	
	int getApprovalAllCnt();

	ApprovalResponseDTO getApprovalDetail(Long num);
	
	int saveApprovalList(ApprovalSaveRequestDTO dto);

	int updateApprovalList(ApprovalSaveRequestDTO dto);
	
}
