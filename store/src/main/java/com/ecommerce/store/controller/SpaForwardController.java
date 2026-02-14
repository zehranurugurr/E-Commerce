package com.ecommerce.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping(value = {
            "/{path:^(?!api$|index\\.html$)[^\\.]*}",
            "/{path:^(?!api$).*$}/**/{subpath:[^\\.]*}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
