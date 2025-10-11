package com.approval.project.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.approval.project.model.ApprovalRequestDTO;
import com.approval.project.model.ApprovalResponseDTO;
import com.approval.project.model.ApprovalSaveRequestDTO;
import com.approval.project.service.ApprovalServiceInter;

@RestController
@RequestMapping("api/approval")
public class ApprovalController {
	
	@Autowired
	public ApprovalServiceInter approvalService;

	@GetMapping
	public List<ApprovalResponseDTO> getApprovalList(@ModelAttribute ApprovalRequestDTO dto) {
		return approvalService.getApprovalList(dto);
	}

	@GetMapping("/cnt")
	public int getApprovalTotalCnt(@ModelAttribute ApprovalRequestDTO dto) {
		int cnt = approvalService.getApprovalTotalCnt(dto);
		return cnt;
	}
	
	@GetMapping("/all-cnt")
	public int getApprovalAllCnt() {
		return approvalService.getApprovalAllCnt() + 1;
	}

	@GetMapping("/detail")
	public ApprovalResponseDTO getApprovalDetail(@RequestParam("num") Long num) {
		return approvalService.getApprovalDetail(num);
	}

	@GetMapping("/history")
	public List<ApprovalResponseDTO> getApprovalHistory(@RequestParam("num") Long num) {
		return approvalService.getApprovalHistory(num);
	}
	
	@PostMapping
	public Map<String, Object> saveApproval(@RequestBody ApprovalSaveRequestDTO dto) {
		return approvalService.saveApproval(dto);
	}
}
