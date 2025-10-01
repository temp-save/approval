package com.approval.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.approval.project.service.ApprovalServiceInter;

@RestController
@RequestMapping("approval")
public class ApprovalController {
	
	@Autowired
	public ApprovalServiceInter approvalService;

}
