package amazonia.com.backend.models;

public class Account {
    
    private String accountId;
    private String name;
    private String username;
    private String password;
    private String role;

    public Account() {
    }

    public Account(String accountId, String name, String username, String password, String role) {
        this.accountId = accountId;
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public String getAccountId() {
        return accountId;
    }
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
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

    @Override
    public String toString() {
        return "Account [accountId=" + accountId + ", name=" + name + ", username=" + username + ", password="
                + password + ", role=" + role + "]";
    }

    
}
