---
title: "AppWrite"
group: "Web backend"
---

## Summary

Open-source backend server that provides developers with a set of easy-to-use APIs for managing authentication, databases, storage, and more, enabling rapid development of modern web and mobile applications.

## Feedback

- Relationship are messy (can't easily query / include / exclude childs or parent)
    - Only alternative is doing the relationship yourself
    - Can't do queries like all user where there is no posts or similar (all users with more than 10 likes on the posts)
- Function developpement is documented but specific case are a pain (sending a file in binary format)
    - Local setup is somewhat hard in order to avoid having to deploy for every test
- Can't reorder the fields
- No easy way to add data to an user (no relation to Auth table, need to create your own table with function to ensure that it's sync on user registration)