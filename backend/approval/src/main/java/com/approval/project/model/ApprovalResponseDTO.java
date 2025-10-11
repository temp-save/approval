package com.approval.project.model;

public class ApprovalResponseDTO extends ApprovalListEntity {
	private String empName;
	private String approverName;
	private String statusName;
	private int writerPositionLevel;
	
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getApproverName() {
		return approverName;
	}
	public void setApproverName(String approverName) {
		this.approverName = approverName;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public int getWriterPositionLevel() {
		return writerPositionLevel;
	}
	public void setWriterPositionLevel(int writerPositionLevel) {
		this.writerPositionLevel = writerPositionLevel;
	}
}
