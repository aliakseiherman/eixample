# eixample


## Multi-Tenant .NET 6 Architecture (ASP.NET Core)

![image](https://i.imgur.com/cqE6kAj.png)

## Features

 - Multi-Tenancy
 - **Tenant resolved by subdomain**
 - Audit at **EF Core** level
 - ~~Soft Delete~~ **DEPRECATED — reason: it's unnatural for RDBMS to keep inactive records; leads to issues with FK constraint; use separate database to keep the log of the deleted records along with the related info; alternatively, consider Event Sourcing pattern;**
 - Automatic HTTP proxies generation for the front-end (Angular)
 - JWT Authentication
 - SPA front-end (Angular, Vue, React)
 - basic login / signup functionality
 - demo functionality (demonstrates audit functionality)
 - one user per multiple tenants (as with *.stackexchange.com)


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



## Screenshots

![image](https://i.imgur.com/6dElfAj.png)

![image](https://i.imgur.com/PWtGK7y.png)

![image](https://i.imgur.com/MpQn2gx.png)
