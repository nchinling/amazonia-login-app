package amazonia.com.backend.repositories;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import amazonia.com.backend.models.Account;

public class AccountRowMapper implements RowMapper<Account> {
    
    @Override
    public Account mapRow(ResultSet rs, int rowNum) throws SQLException {

        Account account = new Account();

        account.setAccountId(rs.getString("account_id"));
        account.setName(rs.getString("name"));
        account.setUsername(rs.getString("username"));
        account.setPassword(rs.getString("password"));
        account.setRole(rs.getString("role"));

        return account;
    }
}
