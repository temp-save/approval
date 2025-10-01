package com.approval.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.approval.project.mapper.ApprovalMapper;

@Service
public class ApprovalService implements ApprovalServiceInter {
	
	@Autowired
	private ApprovalMapper approvalMapper;

}
