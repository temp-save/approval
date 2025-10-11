package com.approval.project.service;

import java.util.List;
import java.util.Map;

import com.approval.project.model.ApprovalRequestDTO;
import com.approval.project.model.ApprovalResponseDTO;
import com.approval.project.model.ApprovalSaveRequestDTO;

public interface ApprovalServiceInter {
	
	List<ApprovalResponseDTO> getApprovalList(ApprovalRequestDTO dto);

	int getApprovalTotalCnt(ApprovalRequestDTO dto);
	
	int getApprovalAllCnt();

	ApprovalResponseDTO getApprovalDetail(Long num);
	
	List<ApprovalResponseDTO> getApprovalHistory(Long num);
	
	Map<String, Object> saveApproval(ApprovalSaveRequestDTO entity);

}
