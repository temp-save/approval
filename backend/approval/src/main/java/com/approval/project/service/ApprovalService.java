package com.approval.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.approval.project.mapper.ApprovalHistoryMapper;
import com.approval.project.mapper.ApprovalMapper;
import com.approval.project.model.ApprovalRequestDTO;
import com.approval.project.model.ApprovalResponseDTO;
import com.approval.project.model.ApprovalSaveRequestDTO;

@Service
public class ApprovalService implements ApprovalServiceInter {
	
	@Autowired
	private ApprovalMapper approvalMapper;
	
	@Autowired
	private ApprovalHistoryMapper historyMapper;

	public List<ApprovalResponseDTO> getApprovalList(ApprovalRequestDTO dto) {
		return approvalMapper.getApprovalList(dto);
	}

	public int getApprovalTotalCnt(ApprovalRequestDTO dto) {
		return approvalMapper.getApprovalTotalCnt(dto);
	}

	public int getApprovalAllCnt() {
		return approvalMapper.getApprovalAllCnt();
	}

	public ApprovalResponseDTO getApprovalDetail(Long num) {
		return approvalMapper.getApprovalDetail(num);
	}
	
	public List<ApprovalResponseDTO> getApprovalHistory(Long num) {
		return historyMapper.getApprovalHistory(num);
	}
	
	public Map<String, Object> saveApproval(ApprovalSaveRequestDTO dto) {
		Map<String, Object> res = new HashMap<String, Object>();
		try {
			// approval_list 등록, 수정 분기
			if (dto.getNum() == 0) {
				// 등록
				int addListRes = approvalMapper.saveApprovalList(dto);
				if (addListRes == 0) {
					res.put("status", "error");
					res.put("message", "approval_list 등록에러");
					return res;
				}
			} else {
				// 수정
				int modListRes = approvalMapper.updateApprovalList(dto);
				if (modListRes == 0) {
					res.put("status", "error");
					res.put("message", "approval_list 수정에러");
					return res;
				}
			}
			
			// approval_history
			int addHistoryRes = historyMapper.saveApprovalHistory(dto);
			if (addHistoryRes == 0) {
				res.put("status", "error");
				Map<String, Object> errorRes = new HashMap<String, Object>();
				errorRes.put("message", "approval_history 등록에러");
				return res;
			}
		} catch(Exception e) {
			res.put("status", "error");
			res.put("message", e.getMessage());
			return res;
		}
		
		res.put("status", "success");
		res.put("message", "결재 성공");
		return res;
	}
	
}
