package web.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import web.services.UserService;

import java.security.Principal;


@Controller
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/login")
    public String loginPage() {
        return "login";
    }

    @RequestMapping("/admin/")
    public String showAdminPage(Model model, Principal principal) {
        model.addAttribute("userDetails", userService.loadUserByUsername(principal.getName()));
        return "admin/index";
    }

    @RequestMapping("/admin/user")
    public String showAdminUserPage(Model model, Principal principal) {
        model.addAttribute("userDetails", userService.loadUserByUsername(principal.getName()));
        return "admin/user";
    }

    @RequestMapping("/user/")
    public String showUserPage(Model model, Principal principal) {
        model.addAttribute("userDetails", userService.loadUserByUsername(principal.getName()));
        return "user/index";
    }
}
