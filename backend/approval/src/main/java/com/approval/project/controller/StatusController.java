package com.approval.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.approval.project.model.StatusResponseDTO;
import com.approval.project.service.StatusService;

@RestController
@RequestMapping("api/status")
public class StatusController {
	@Autowired
	private StatusService statusService;
	
	@GetMapping
	public List<StatusResponseDTO> getAllStatus() {
		return statusService.getAllStatus();
	}
}
