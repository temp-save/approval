package com.approval.project.model;

public class EmpEntity {
	private String empNo;	// 사원번호
	private String userId;	// 아이디		
	private String userPw;	// 비밀번호
	private String empName;	// 사원이름
	private String positionCd;	// 직위코드
	
	public String getEmpNo() {
		return empNo;
	}
	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserPw() {
		return userPw;
	}
	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getPositionCd() {
		return positionCd;
	}
	public void setPositionCd(String positionCd) {
		this.positionCd = positionCd;
	}
	
}
