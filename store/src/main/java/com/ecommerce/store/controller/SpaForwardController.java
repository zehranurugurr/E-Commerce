package com.ecommerce.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaForwardController {
    @RequestMapping("/{path:[^\\.]*}")
    public String forwardRoot() {
        return "forward:/index.html";
    }

    @RequestMapping("/**/{path:[^\\.]*}")
    public String forwardNested() {
        return "forward:/index.html";
    }
}
