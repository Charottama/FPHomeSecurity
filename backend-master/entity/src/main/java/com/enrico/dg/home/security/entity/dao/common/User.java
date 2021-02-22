package com.enrico.dg.home.security.entity.dao.common;

import net.karneim.pojobuilder.GeneratePojoBuilder;

@GeneratePojoBuilder
public class User extends BaseMongo {

    private String name;
    private String email;
    private String password;
    private String role;
    private String macAddress;
    private String sosNumber;
    private String emergencyNumber;
    private String imageUrl;
    private String publicId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public String getSosNumber() {
        return sosNumber;
    }

    public void setSosNumber(String sosNumber) {
        this.sosNumber = sosNumber;
    }

    public String getEmergencyNumber() {
        return emergencyNumber;
    }

    public void setEmergencyNumber(String emergencyNumber) {
        this.emergencyNumber = emergencyNumber;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", macAddress='" + macAddress + '\'' +
                ", sosNumber='" + sosNumber + '\'' +
                ", emergencyNumber='" + emergencyNumber + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", publicId='" + publicId + '\'' +
                '}';
    }
}
