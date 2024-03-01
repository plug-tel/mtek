package com.m.tek.services;

import com.m.tek.entities.PasswordResetToken;
import com.m.tek.entities.User;
import com.m.tek.repository.TokenRepository;
import com.m.tek.repository.UserRepository;
import com.m.tek.services.UserDetailsImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserDetailsServiceImpl  implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    TokenRepository tokenRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));

        return UserDetailsImpl.build(user);
    }

    public String sendEmailResetPassword(User user){

        try {
            String resetLink = generateResetToken(user);

            SimpleMailMessage msg = new SimpleMailMessage();

            msg.setFrom("mtekapp@gmail.com");
            msg.setTo(user.getEmail());

            msg.setSubject("Welcome");
            msg.setText("Hello \n\n" + "Please click on this link to Reset your Password : " + resetLink + ". \n\n"
                    + "Regards \n" + "ABC");

            javaMailSender.send(msg);

            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }

    }

    public String generateResetToken(User user) {
        UUID uuid = UUID.randomUUID();
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime expiryDateTime = currentDateTime.plusMinutes(30);
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user);
        resetToken.setToken(uuid.toString());
        resetToken.setExpiryDateTime(expiryDateTime);
        resetToken.setUser(user);
        PasswordResetToken token = tokenRepository.save(resetToken);
        if (token != null) {
            String endpointUrl = "http://localhost:3000/resetPassword";
            return endpointUrl + "/" + resetToken.getToken();
        }
        return "";
    }


    public boolean hasExipred(LocalDateTime expiryDateTime) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return expiryDateTime.isAfter(currentDateTime);
    }
}