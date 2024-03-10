package amazonia.com.backend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import amazonia.com.backend.exceptions.AccountException;
import amazonia.com.backend.models.Account;
import amazonia.com.backend.services.AccountService;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
@RequestMapping(path="/api")
@CrossOrigin(origins="*")
public class AccountController {

    @Autowired
    private AccountService accSvc;

    @PostMapping(path="/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	@ResponseBody
	public ResponseEntity<String> login(@RequestBody MultiValueMap<String, String> form) throws Exception {

        String username = form.getFirst("username");
        String password = form.getFirst("password");

        JsonObject response = null;

            Account loggedInAccount;
            try {
                loggedInAccount = accSvc.loginAccount(username, password);
                response = Json.createObjectBuilder()
                .add("account_id", loggedInAccount.getAccountId())
                .add("name", loggedInAccount.getName())
                .add("username", loggedInAccount.getUsername())
                .add("role", loggedInAccount.getRole())
                .build();
            } catch (AccountException | IOException e) {
                String errorMessage = e.getMessage();
                response = Json.createObjectBuilder()
                .add("error", errorMessage)
                .build();

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response.toString());
            }

        return ResponseEntity.ok(response.toString());
    }
}
