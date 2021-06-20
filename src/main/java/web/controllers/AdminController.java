package web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import web.models.Role;
import web.models.User;
import web.services.RoleService;
import web.services.UserService;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("/admin/")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @GetMapping()
    public String showAllUsers(Model model, Principal principal) {
        model.addAttribute("users", userService.getAllUsers());
        User user = userService.getUserByUsername(principal.getName());
        model.addAttribute("userInfo", user);
        model.addAttribute("newUser", new User());
        model.addAttribute("roles", roleService.getAllRoles());
        return "admin/index";
    }

    @PostMapping(value = "saveUser")
    public String saveUser(@ModelAttribute("newUser") User user, @RequestParam(value = "role", required = false) String[] role) {
        Set<Role> roleSet = new HashSet<>();
        for (String roles : role) {
            roleSet.add(roleService.getRoleById(Integer.parseInt(roles)));
        }
        user.setRoles(roleSet);
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        userService.addUser(user);
        return "redirect:/admin/";
    }

    @PostMapping(value = "updateUser")
    public String updateUser(@ModelAttribute User userEdit, @RequestParam(value = "role", required = false) String[] role,
                             @RequestParam(value = "id", required = false) int id,
                             @RequestParam(value = "lastName", required = false) String lastName,
                             @RequestParam(value = "password", required = false) String password,
                             @RequestParam(value = "email", required = false) String email,
                             @RequestParam(value = "age", required = false) int age,
                             @RequestParam(value = "firstName", required = false) String firstName) {
        Set<Role> roleSet = new HashSet<>();
        for (String roles : role) {
            roleSet.add(roleService.getRoleById(Integer.parseInt(roles)));
        }
        userEdit.setRoles(roleSet);
        userEdit.setId(id);
        userEdit.setFirstName(firstName);
        userEdit.setLastName(lastName);
        userEdit.setPassword(password);
        userEdit.setAge(age);
        userEdit.setEmail(email);
        userEdit.setPassword(passwordEncoder().encode(userEdit.getPassword()));
        userService.updateUser(userEdit);
        return "redirect:/admin/";
    }

    @PostMapping("deleteUser/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        userService.removeUser(id);
        return "redirect:/admin/";
    }
}
