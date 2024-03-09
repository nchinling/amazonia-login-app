package amazonia.com.backend.services;

import java.io.IOException;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amazonia.com.backend.exceptions.AccountException;
import amazonia.com.backend.models.Account;
import amazonia.com.backend.repositories.AccountRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepo;

    public Account loginAccount(String username, String password) throws IOException, AccountException {
            Optional<Account> optAccount = accountRepo.getAccountByUsernameAndPassword(username,password);

            if (optAccount.isPresent()) {
                Account loggedInAccount = optAccount.get();
                System.out.printf(">>>String Password is >>>" + password);
                System.out.printf(">>>loggedInAccountPassword is >>>" + loggedInAccount.getPassword());   
                return loggedInAccount;
      

            } else {
                throw new AccountException("Invalid userid or password");
            }
    }
    
}
