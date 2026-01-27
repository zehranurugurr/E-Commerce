package com.ecommerce.store.controller;

import com.ecommerce.store.dto.AuthRequest;
import com.ecommerce.store.dto.AuthResponse;
import com.ecommerce.store.dto.RegisterRequest;
import com.ecommerce.store.service.AuthService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.login(request);
    }
}
