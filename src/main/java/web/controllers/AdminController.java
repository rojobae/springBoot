package web.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import web.services.UserService;

import java.security.Principal;


@Controller
@RequestMapping("/admin/")
public class AdminController {

    @Autowired
    UserService userService;

    @GetMapping()
    public String showAllUsers(Model model, Principal principal) {
        model.addAttribute("userInfo", userService.getUserByUsername(principal.getName()));
        return "admin/index";
    }

    @GetMapping("/user")
    public String showUser(Model model, Principal principal) {
        model.addAttribute("userInfo", userService.getUserByUsername(principal.getName()));
        return "admin/user";
    }

}
