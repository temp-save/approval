 package com.approval.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.approval.project.model.LoginRequestDTO;
import com.approval.project.model.LoginResponseDTO;
import com.approval.project.service.EmpServiceInter;


@RestController
@RequestMapping("api/emp")
public class EmpController {
	
	@Autowired	private EmpServiceInter empService; 
	
	@PostMapping("/login")
	public LoginResponseDTO login(@RequestBody LoginRequestDTO dto) {
		return empService.login(dto);
	}

}
