package amazonia.com.backend.repositories;

import static amazonia.com.backend.repositories.DBQueries.*;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import amazonia.com.backend.models.Account;

@Repository
public class AccountRepository {

    @Autowired 
    JdbcTemplate jdbcTemplate;

    public Optional<Account> getAccountByUsernameAndPassword(String username, String password){
        List<Account> accounts = jdbcTemplate.query(SELECT_ACCOUNT_BY_USERNAME_AND_PASSWORD, 
        new AccountRowMapper() , new Object[]{username, password});
        
        if (!accounts.isEmpty()) {
            return Optional.of(accounts.get(0));
        } else {
            return Optional.empty();
        }
        
    }
    
}
