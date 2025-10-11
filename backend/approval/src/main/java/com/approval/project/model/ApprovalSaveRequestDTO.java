package com.approval.project.model;

public class ApprovalSaveRequestDTO extends ApprovalListEntity {
	private String positionCd;
	private String beforeStatusCode;
	
	public String getPositionCd() {
		return positionCd;
	}
	public void setPositionCd(String positionCd) {
		this.positionCd = positionCd;
	}
	public String getBeforeStatusCode() {
		return beforeStatusCode;
	}
	public void setBeforeStatusCode(String beforeStatusCode) {
		this.beforeStatusCode = beforeStatusCode;
	}
}
