# API文档

## 1.用户相关API（user）

### 1.注册
```js
    {
        Method:POST,
        Url:"http://localhost:3000/api/users",
        Data:{
            name,
            email,
            password,
            authority,
        }
    }
    // 返回注册完成后的用户数据
```

### 2.登录
```JS
    {
        Method:POST,
        Url:"http://localhost:3000/api/users/login",
        Data:{
            name || email,
            password
        }
    }
    // 返回token令牌
```

### 3.获取当前用户信息
```js
    {
        Method:GET,
        Url:"http://localhost:3000/api/user",
        headers:Bearer token
    }
    // 返回当前用户的数据，不包含密码
```


### 4.修改用户信息
```js
    {
        Method:PUT,
        Url:"http://localhost:3000/api/user"
        Data:{
            [name],
            [email],
            [password],
        }
    }
    // 返回修改后的用户信息
```

### 5.注销登录
```js
    {
        // 清除
    }
    // 
```

### 6.注销用户
```js
    {
        Method:DELETE,
        Url:"http://localhost:3000/api/user"
        {
            // 无需参数
        }
    }
    // 返回被注销的用户的信息   
```

## 2.题目相关API

### 1.题目查询
```js
    {
        Method:GET
        
    }
```

### 2.当前题查询