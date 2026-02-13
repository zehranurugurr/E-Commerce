package com.ecommerce.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaForwardController {

    @RequestMapping(value = {
            "/{path:^(?!api$).*$}",
            "/{path:^(?!api$).*$}/**/{path:[^\\.]*}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
