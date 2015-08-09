# 设计
## 式样
- todo-list列表可以排序，修改内容，添加删除内容。
- design使用google的metarial ui
- 基本和ipmsg的构思相同
  - 主界面是局域网内所有成员的list(name, group)，包括自己。
  - 点击成员进入该成员的todo-list，也是list，包括自己。

## 技术
- javascript
- react(不知道行不行?)
- socket udp
- chrome app

## 网络连接的设计
- 全部使用udp来连接，不需要可靠的连接，收不到就算了。。
- 连本地数据都通过udp通知来获取。

## 数据格式
