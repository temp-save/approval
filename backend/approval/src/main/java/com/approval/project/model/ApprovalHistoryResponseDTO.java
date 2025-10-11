package com.approval.project.model;

public class ApprovalHistoryResponseDTO extends ApprovalHistoryEntity {
	private String procName;
	private String positionName;
	private String statusName;
	
	public String getProcName() {
		return procName;
	}
	public void setProcName(String procName) {
		this.procName = procName;
	}
	public String getPositionName() {
		return positionName;
	}
	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
}
