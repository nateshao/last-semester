## IDEA破解

![](https://gitee.com/nateshao/images/raw/master/img/20210909201701.png)



## 任务2：Java类与对象

![](https://gitee.com/nateshao/images/raw/master/img/20210909210757.png)

```java
package com.nateshao.demo01;

/**
 * @date Created by 邵桐杰 on 2021/9/9 20:34
 * @微信公众号 千羽的编程时光
 * @个人网站 www.nateshao.cn
 * @博客 https://nateshao.gitee.io
 * @GitHub https://github.com/nateshao
 * @Gitee https://gitee.com/nateshao
 * Description:  Circle和CircleArea，分别计算半径为1和2的圆面积，并从控制台输出。
 */
public class Circle {
    double radius;
    double area() {
        return Math.PI * radius * radius;
    }
    public static void main(String[] args) {
        Circle c1 = new Circle(), c2 = new Circle();
        c1.radius = 1; c2.radius = 2.0;
        System.out.println("半径为1的圆，面积为: " + c1.area());
        System. out.println("半径为2的圆,面积为:" + c2.area());
    }
}
```

## 任务3：封装与继承









































