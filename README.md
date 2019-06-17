# eixample


## Multi-Tenant ASP.NET Core Architecture

Building basis for multi-tenant SPA apps

![image](https://i.imgur.com/cqE6kAj.png)

## Features

 - Multi-Tenancy
 - **Tenant resolved by subdomain**
 - Audit (both for EF 6.x and EF Core)
 - EF 6.x Dynamic Filters
 - Soft Delete
 - Automatic HTTP proxies generation for the front-end
 - JWT Authentication
 - SPA front-end (Angular, Vue, React)
 - basic login / signup functionality
 - demo functionality (demonstrates auditing for EF entities)
 - one user per many tenants (as with *.stackexchange.com)


## Setup

The setup is pretty straightforward if you are familiar with `Entity Framework Code First` approach & `Node.js`.

Add to hosts:

```
127.0.0.1       eixample
127.0.0.1       subdomain1.eixample
127.0.0.1       subdomain2.eixample
```

Open back-end solution in Visual Studio, make sure the connection string is correct.

Go to `Package Manager Console` and run the following command against Entity Framework project:

```
Update-Database
```

Note that Seed Data doesn't work with SQL Server 2017 without explicitly stating `DateTime` fields are of `datetime2` type e.g.

```
[Column(TypeName = "datetime2")]
```

Go to *angular* folder & run the following commands:

```
npm install
ng serve --host eixample --disable-host-check --port 4000
```

Access the website 

```
http://subdomain1.eixample:4000
http://subdomain2.eixample:4000/
```

Default login details:

```
username: admin
password: 123qwe
```

You can of course create your own user on *Register* page.

Verified with:
```
Angular CLI: 7.1.2
Node: 10.14.1
OS: win32 x64
npm v6.4.1
```



## Screenshots

![image](https://i.imgur.com/TaYj8fa.png)

![image](https://i.imgur.com/5bFQk46.png)

![image](https://i.imgur.com/iCLWmp8.png)

![image](https://i.imgur.com/LBnqhEr.png)