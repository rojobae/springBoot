package web.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.models.User;
import web.services.RoleService;
import web.services.UserService;

import java.security.Principal;
import java.util.List;


@RestController
public class RestAPIController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/admin/users")
    public List<User> list() {
        return userService.getAllUsers();
    }


    @PostMapping("/admin/usersAdd")
    public void add(@RequestBody User user) {
        userService.addUser(user);
    }

    @PutMapping("/admin/usersEdit")
    public void update(@RequestBody User user) {
        userService.updateUser(user);
    }

    @DeleteMapping("/admin/usersDelete/{id}")
    public void delete(@PathVariable Integer id) {
        userService.removeUser(id);
    }

    @GetMapping("/user/userGet")
    public User getCurrentUser(Principal principal) {
        return userService.getUserByUsername(principal.getName());
    }

}
