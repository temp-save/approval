package com.approval.project.service;

import com.approval.project.model.LoginRequestDTO;
import com.approval.project.model.LoginResponseDTO;

public interface EmpServiceInter {
	LoginResponseDTO login(LoginRequestDTO dto);

}
