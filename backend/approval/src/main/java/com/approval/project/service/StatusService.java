package com.approval.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.approval.project.mapper.StatusMapper;
import com.approval.project.model.StatusResponseDTO;

@Service
public class StatusService {
	@Autowired
	private StatusMapper statusMapper;
	
	public List<StatusResponseDTO> getAllStatus() {
		return statusMapper.getAllStatus();
	}
}
