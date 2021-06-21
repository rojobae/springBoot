package web.controllers;


import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import web.services.UserService;

import java.security.Principal;


@Controller
@RequestMapping("/user/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public String getUserPage(Model model, Principal principal) {
        model.addAttribute("userInfo", userService.getUserByUsername(principal.getName()));;
        return "user/index";
    }
}
