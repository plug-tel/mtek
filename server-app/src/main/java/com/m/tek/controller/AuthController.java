package com.m.tek.controller;

import com.m.tek.dto.SignupDTO;
import com.m.tek.dto.UserDTO;
import com.m.tek.entities.PasswordResetToken;
import com.m.tek.entities.User;
import com.m.tek.repository.TokenRepository;
import com.m.tek.repository.UserRepository;
import com.m.tek.response.JwtResponse;
import com.m.tek.response.MessageResponse;
import com.m.tek.security.jwt.JwtUtils;
import com.m.tek.services.UserDetailsImpl;
import com.m.tek.services.UserDetailsServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    TokenRepository tokenRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(),
                        loginDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail()));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupDTO signUpDTO) {
        if (userRepository.existsByUsername(signUpDTO.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpDTO.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(signUpDTO.getUsername(),
                signUpDTO.getEmail(),
                encoder.encode(signUpDTO.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!principle.toString().equals("anonymousUser")) {
            Long userId = ((UserDetailsImpl) principle).getId();
        }
        return ResponseEntity.ok()
                .body(new MessageResponse("You've been signed out!"));
    }

    @PostMapping("/forgotPassword")
    public String forgotPassordProcess(@Valid @RequestBody UserDTO userDTO) {
        String output = "";
        Optional<User> user = userRepository.findByEmail(userDTO.getEmail());
        if (user != null) {
            output = userDetailsService.sendEmailResetPassword(user.get());
        }
        if (output.equals("success")) {
            return "success";
        }
        return "error";
    }

    @GetMapping("/resetPassword/{token}")
    public String resetPasswordForm(@PathVariable String token) {
        PasswordResetToken reset = tokenRepository.findByToken(token);
        if (reset != null && userDetailsService.hasExipred(reset.getExpiryDateTime())) {
            return "succes";
        }
        return "error";
    }

    @PostMapping("/resetPassword")
    public String passwordResetProcess(@Valid @RequestBody UserDTO userDTO) {
        Optional<User> user = userRepository.findByEmail(userDTO.getEmail());
        if(user != null) {
            user.get().setPassword(passwordEncoder.encode(userDTO.getPassword()));
            userRepository.save(user.get());
        }
        return "success";
    }
}