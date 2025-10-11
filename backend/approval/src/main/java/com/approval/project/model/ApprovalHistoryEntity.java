package com.approval.project.model;

import java.sql.Date;

public class ApprovalHistoryEntity {
	private int hisNum;	// 이력번호
	private int approvalNum;	// 글번호
	private String procId;	// 처리자 ID
	private String positionCd;	// 직급 코드
	private String statusCode;	// 결재상태코드
	private Date hisRegDate;	// 등록일
	
	public int getHisNum() {
		return hisNum;
	}
	public void setHisNum(int hisNum) {
		this.hisNum = hisNum;
	}
	public int getApprovalNum() {
		return approvalNum;
	}
	public void setApprovalNum(int approvalNum) {
		this.approvalNum = approvalNum;
	}
	public String getProcId() {
		return procId;
	}
	public void setProcId(String procId) {
		this.procId = procId;
	}
	public String getPositionCd() {
		return positionCd;
	}
	public void setPositionCd(String positionCd) {
		this.positionCd = positionCd;
	}
	public String getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
	public Date getHisRegDate() {
		return hisRegDate;
	}
	public void setHisRegDate(Date hisRegDate) {
		this.hisRegDate = hisRegDate;
	}
	
}
