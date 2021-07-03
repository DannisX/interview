# Interview系统

暂未部署至线上，请下载至本地使用

## 使用条件：  

**须安装mongoDB**   

## 使用方式：

1.下载之后前端启动命令行 使用`node app.js`或者`nodemon app.js`命令启动   
2.在浏览器中URL栏输入`http://localhost:3000/questions/restore`，或者使用接口测试工具，例如`postman`，访问该地址，即可以将题目数据还原至本地数据库中，无需自己创建，会自动创建   
3.完成上述步骤，后端即启用成功   


## 备份数据库   

在浏览器中URL栏输入`http://localhost:3000/questions/backup`，或者使用接口测试工具，例如`postman`，访问该地址，即可将题目数据备份至本地json文件，须存在data文件夹，备份前须不存在questions集合   

