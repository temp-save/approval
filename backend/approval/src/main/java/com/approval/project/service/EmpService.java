package com.approval.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.approval.project.mapper.EmpMapper;
import com.approval.project.model.LoginRequestDTO;
import com.approval.project.model.LoginResponseDTO;

@Service
public class EmpService implements EmpServiceInter {
	
	@Autowired
	private EmpMapper empMapper;

	public LoginResponseDTO login(LoginRequestDTO dto) {
		return empMapper.login(dto);
	}
}
