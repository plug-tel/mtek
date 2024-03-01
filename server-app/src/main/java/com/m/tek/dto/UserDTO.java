package com.m.tek.dto;

import jakarta.validation.constraints.NotBlank;

public class UserDTO {
    private String username;
    @NotBlank
    private String email;

    private String password;

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
