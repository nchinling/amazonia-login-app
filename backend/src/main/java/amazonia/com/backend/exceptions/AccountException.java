package amazonia.com.backend.exceptions;

public class AccountException extends Exception {
    public AccountException(){
        super();
    }
    public AccountException(String message){
        super(message);
    }
}
